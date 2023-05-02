import React, { useEffect, useState } from 'react'
import { Button, notification, Popconfirm, Table } from 'antd'
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table'
import type { FilterValue } from 'antd/es/table/interface'
import { useNavigate } from 'react-router-dom'
import { DeleteOutlined, EditOutlined, ImportOutlined, PlusOutlined } from '@ant-design/icons'

interface DataType {
    index: number,
    name: string;
}

interface TableParams {
    pagination?: TablePaginationConfig;
    sortField?: string;
    sortOrder?: string;
    filters?: Record<string, FilterValue>;
}

const SamplerProgramTable: React.FunctionComponent = () => {
    let navigate = useNavigate();
    const [data, setData] = useState<DataType[]>()
    const [loading, setLoading] = useState(false)
    const [tableParams, setTableParams] = useState<TableParams>({
        pagination: {
            current: 1,
            pageSize: 7,
            hideOnSinglePage: true,
        },
    })
    const fetchData = () => {
        setLoading(true);
        fetch(`http://localhost:4000/api/midi/sampler/request-resident-program-names`)
            .then((res) => res.json())
            .then((results) => {
                let data: DataType[] = []
                let incoming_data: string[] = results
                
                incoming_data.forEach((name, index) => {
                    data.push({index, name})
                });

                setData(data);
                setLoading(false);
                setTableParams({
                    ...tableParams,
                    pagination: {
                        ...tableParams.pagination,
                        total: data.length,
                    },
                })
            })
    }
    const [api] = notification.useNotification();
    useEffect(() => {
        console.log("Rendering sampler program table")
        fetchData()
    }, [JSON.stringify(tableParams)])
    const handleTableChange = (
        pagination: TablePaginationConfig,
    ) => {
        setTableParams({
            ...tableParams,
            pagination
        })
    }
    let handleEditProgram = (record: DataType) => {
        navigate("/in-memory-program/" + record.index)
    }
    let handleDeleteProgram = (programNumberInMemory: number) => {
        fetch(
            `http://localhost:4000/api/midi/sampler/program/${programNumberInMemory}`,
            {method: 'DELETE'}
        ).then((value: Response) => {
            fetchData()
        }).catch((reason: any) => {
            api['error']({
                message: 'Delete Failure',
                description: 'Could not delete the program: ' + reason,
            })
        })   
    }
    let handleAddProgram = () => {
        fetch(
            `http://localhost:4000/api/midi/sampler/program/${data?.length}`,
            {method: 'POST'}
        ).then((value: Response) => {
            fetchData()
        }).catch((reason: any) => {
            api['error']({
                message: 'Add Failure',
                description: 'Could not add a new program: ' + reason,
            })
        })   
    }
    let handleImportProgramToLibrary = (programNumberInMemory: number) => {
        fetch(
            `http://localhost:4000/api/midi/sampler/import_to_library/program/${programNumberInMemory}`,
            {method: 'GET'}
        ).then((value: Response) => {
        }).catch((reason: any) => {
            api['error']({
                message: 'Add Failure',
                description: 'Could not import program: ' + reason,
            })
        })   
    }
    const columns: ColumnsType<DataType> = [
        {
            title: '',
            dataIndex: 'index',
            width: '10%',
            render: (index) => "" + (index + 1),
        },
        {
            title: 'Name',
            dataIndex: 'name',
            width: '70%',
        },
        {
            title: '',
            dataIndex: 'action',
            width: '20%',
            render: (value: any, record: DataType, index: number) => {
                return  <>
                            <Popconfirm title="Are you sure?" onConfirm={() => handleDeleteProgram(record.index)}>
                                <DeleteOutlined title="Delete program" />
                            </Popconfirm>
                            <EditOutlined title='Edit program' onClick={() => handleEditProgram(record)} />
                            <Popconfirm title="Are you sure - large samples will take forever to upload?" onConfirm={() => handleImportProgramToLibrary(record.index)}>
                                <ImportOutlined title='Import sampler program to database' />
                            </Popconfirm>
                        </>
            }
        },
    ]
    
    return (
        <Table
            bordered={true}
            columns={columns}
            rowKey={(record) => record.index}
            dataSource={data}
            pagination={tableParams.pagination}
            loading={loading}
            title={() => 'Programs'}
            onChange={handleTableChange}
            footer={() => <Button type='primary'><PlusOutlined title='Add a new program' onClick={handleAddProgram} /></Button>}
        />
    )
}

export default SamplerProgramTable
