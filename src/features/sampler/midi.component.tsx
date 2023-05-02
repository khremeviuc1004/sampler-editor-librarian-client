import { Col, Form, InputNumber, Row, Select } from 'antd';
import { Program } from '@sampler-editor-librarian/dto';
import { priorityTypes, reassignmentTypes } from '../../util/util';
import { Donut } from 'react-dial-knob';
import { donutTheme } from './donut-theme';

export type MidiPanDetails = {
  programNumberInMemory: number,
  data: Program,
  setData: React.Dispatch<React.SetStateAction<Program>>,
  handleChange: (programHeaderIndex: number, value: number | boolean | null, path: Array<string>, programNumberInMemory: number, program: Program) => void
}

const layout = {
  labelCol: { span: 200 },
  wrapperCol: { span: 200 },
}

export const MidiPan: React.FunctionComponent<MidiPanDetails> = (props) => {

  return (
    <>
      <Row gutter={50}>
        <Col>
          <Form
            {...layout}
            size={"small"}
            layout='vertical'
          >
            <Form.Item
              label={"Program Number"}
            >
              <Donut
                diameter={50}
                step={1}
                jumpLimit={10}
                theme={{
                  ...donutTheme
                }}
                min={0} max={127} value={props.data.midi.programNumber} onValueChange={(value: number | null) => props.handleChange(15, value, ["midi", "midiProgramNumber"], props.programNumberInMemory, props.data)} />
            </Form.Item>
            <Form.Item
              label={"Channel"}
            >
              <Donut
                diameter={50}
                step={1}
                jumpLimit={10}
                theme={{
                  ...donutTheme
                }}
                min={0} max={255} value={props.data.midi.channel} onValueChange={(value: number | null) => props.handleChange(16, value, ["midi", "channel"], props.programNumberInMemory, props.data)} />
            </Form.Item>
            <Form.Item
              label={"Polyphony"}
            >
              <Donut
                diameter={50}
                step={1}
                jumpLimit={10}
                theme={{
                  ...donutTheme
                }}
                min={0} max={31} value={props.data.midi.polyphony} onValueChange={(value: number | null) => props.handleChange(17, value, ["midi", "polyphony"], props.programNumberInMemory, props.data)} />
            </Form.Item>
          </Form>
        </Col>
        <Col>
          <Form
            {...layout}
            size={"small"}
            layout='vertical'
          >
            <Form.Item
              label={"Priority"}
            >
              <Select style={{ width: "90px" }}
                options={priorityTypes} bordered={true} value={props.data.midi.priority} onChange={(value: number | null) => props.handleChange(18, value, ["midi", "priority"], props.programNumberInMemory, props.data)} />
            </Form.Item>
            <Form.Item
              label={"Reassignment"}
            >
              <Select style={{ width: "90px" }}
                options={reassignmentTypes} bordered={true} value={props.data.midi.reassignment} onChange={(value: number | null) => props.handleChange(61, value, ["midi", "reassignment"], props.programNumberInMemory, props.data)} />
            </Form.Item>
          </Form>
        </Col>
        <Col>
          <Form
            {...layout}
            size={"small"}
            layout='vertical'
          >
            <Form.Item
              label={"Play Low"}
            >
              <Donut
                diameter={50}
                step={1}
                jumpLimit={10}
                theme={{
                  ...donutTheme
                }}
                min={21} max={127} value={props.data.midi.playRangeLow} onValueChange={(value: number | null) => props.handleChange(19, value, ["midi", "playRangeLow"], props.programNumberInMemory, props.data)} />
            </Form.Item>
            <Form.Item
              label={"Play High"}
            >
              <Donut
                diameter={50}
                step={1}
                jumpLimit={10}
                theme={{
                  ...donutTheme
                }}
                min={21} max={127} value={props.data.midi.playRangeHigh} onValueChange={(value: number | null) => props.handleChange(20, value, ["midi", "playRangeHigh"], props.programNumberInMemory, props.data)} />
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
}