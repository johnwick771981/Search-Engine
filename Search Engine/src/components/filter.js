import React, { useState } from 'react'
import { Button, Modal, Header, Icon, Select, Form, Radio } from 'semantic-ui-react'

export default function Filter(props) {

    const [visible, setVisible] = useState(props.filter);
    const [fileType, setFileType] = useState(null);
    const [order, setOrder] = useState('desc');

    const fileOptions = [
      { key: '.jpg', value: '.jpg', text: '.jpg' },
      { key: '.jpeg', value: '.jpeg', text: '.jpeg' },
      { key: '.png', value: '.png', text: '.png' },
      { key: '.gif', value: '.gif', text: '.gif' },
      { key: '.pdf', value: '.pdf', text: '.pdf' },
      { key: '.txt', value: '.txt', text: '.txt' },
      { key: '.docx', value: '.docx', text: '.docx' },
      { key: 'others', value: 'others', text: 'others' }
    ]


    return (
        <Modal
        onClose={() => setVisible(false)}
        onOpen={() => setVisible(true)}
        open={visible}
        size='tiny'
        >
      <Header>
        Filters
      </Header>
      <Modal.Content>
      <Select placeholder='Select file type' options={fileOptions} onChange={(e, {value}) => setFileType(value)}/>
      <Form style={{marginTop: "20px"}}>
        <Form.Field>
          Order Files: 
        </Form.Field>
        <Form.Field>
          <Radio
            label='Ascending'
            name='radioGroup'
            value='asc'
            onChange={(e, {value}) => setOrder(value)}
            checked={order === 'asc'}
          />
        </Form.Field>
        <Form.Field>
          <Radio
            label='Descending'
            name='radioGroup'
            value='desc'
            checked={order === 'desc'}
            onChange={(e, {value}) => setOrder(value)}
          />
        </Form.Field>
      </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button 
        basic 
        color='red' 
        onClick={props.changeVisible}>
          <Icon name='remove' /> Cancel
        </Button>
        <Button 
        color='green' 
        onClick={props.changeVisible}>
          <Icon name='checkmark' /> Done
        </Button>
      </Modal.Actions>
    </Modal>
    );
}