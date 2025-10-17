import React from 'react';
import { PlusOutlined } from '@ant-design/icons';
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Select,
  message
} from 'antd';
import dayjs from 'dayjs';

const { Option } = Select;

function AggiungiSpesa() {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    const formattedData = {
      ...values,
      data: values.data ? values.data.format('YYYY-MM-DD') : null,
    };
    
    console.log('Spesa aggiunta:', formattedData);
    // TODO: Invia i dati al backend Django
    message.success('Spesa aggiunta con successo!');
    form.resetFields();
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    message.error('Compila tutti i campi obbligatori');
  };

  return (
    <div style={{ padding: '20px', width: '100%' }}>
      <h2 style={{ color: 'black', fontSize: '28px', fontWeight: 'bold', marginBottom: '30px' }}>
        Aggiungi Spesa
      </h2>

      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '40px',
        maxWidth: '100%',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <Form
          form={form}
          name="aggiungi-spesa"
          layout="vertical"
          initialValues={{
            categoria: 'alimentari',
            data: dayjs()
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '20px' 
          }}>
            {/* Descrizione */}
            <Form.Item
              label={<span style={{ fontWeight: '600', fontSize: '16px' }}>Descrizione</span>}
              name="descrizione"
              rules={[
                { required: true, message: 'Inserisci una descrizione' },
                { min: 3, message: 'La descrizione deve contenere almeno 3 caratteri' }
              ]}
            >
              <Input 
                placeholder="Es: Spesa al supermercato" 
                size="large"
                style={{ borderRadius: '8px' }}
              />
            </Form.Item>
            {/* Importo */}
            <Form.Item
              label={<span style={{ fontWeight: '600', fontSize: '16px' }}>Importo (€)</span>}
              name="importo"
              rules={[
                { required: true, message: 'Inserisci un importo' },
                { type: 'number', min: 0.01, message: 'L\'importo deve essere maggiore di 0' }
              ]}
            >
              <InputNumber
                placeholder="0.00"
                size="large"
                min={0}
                step={0.01}
                precision={2}
                style={{ width: '100%', borderRadius: '8px' }}
                formatter={value => `€ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={value => value.replace(/€\s?|(,*)/g, '')}
              />
            </Form.Item>
          </div>

          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '20px' 
          }}>
            {/* Data */}
            <Form.Item
              label={<span style={{ fontWeight: '600', fontSize: '16px' }}>Data</span>}
              name="data"
              rules={[{ required: true, message: 'Seleziona una data' }]}
            >
              <DatePicker 
                size="large"
                format="DD/MM/YYYY"
                placeholder="Seleziona data"
                style={{ width: '100%', borderRadius: '8px' }}
              />
            </Form.Item>
            {/* Categoria */}
            <Form.Item
              label={<span style={{ fontWeight: '600', fontSize: '16px' }}>Categoria</span>}
              name="categoria"
              rules={[{ required: true, message: 'Seleziona una categoria' }]}
            >
              <Select 
                size="large" 
                placeholder="Seleziona categoria"
                style={{ borderRadius: '8px' }}
              >
                <Option value="alimentari">🍔 Alimentari</Option>
                <Option value="trasporti">🚗 Trasporti</Option>
                <Option value="svago">🎉 Svago</Option>
                <Option value="altro">📌 Altro</Option>
              </Select>
            </Form.Item>
          </div>

          <Form.Item style={{ marginBottom: 0, marginTop: '10px' }}>
            <Button 
              type="primary" 
              htmlType="submit" 
              size="large"
              icon={<PlusOutlined />}
              style={{
                width: '100%',
                height: '50px',
                borderRadius: '8px',
                fontSize: '18px',
                fontWeight: 'bold',
                backgroundColor: '#2196f3',
                borderColor: '#2196f3'
              }}
            >
              Aggiungi Spesa
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default AggiungiSpesa;
