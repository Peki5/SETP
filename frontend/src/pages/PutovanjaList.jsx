import {
  Button,
  DatePicker,
  Form,
  Input,
  Modal,
  Space,
  Table,
  message,
} from 'antd';
import 'antd/dist/reset.css';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addPutovanje, fetchPutovanja } from '../api';
import '../style/PutovanjaList.css';

const { RangePicker } = DatePicker;

function PutovanjaList() {
  const [putovanja, setPutovanja] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    const loadPutovanja = async () => {
      try {
        const response = await fetchPutovanja();
        setPutovanja(response.data);
      } catch (err) {
        message.error('Greška pri dohvaćanju putovanja.');
      }
    };

    loadPutovanja();
  }, []);

  const openNewForm = () => {
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = async (values) => {
    const putovanjeData = {
      datumPocetka: values.dateRange[0].format('YYYY-MM-DD'),
      datumZavrsetka: values.dateRange[1].format('YYYY-MM-DD'),
      svrha: values.svrha,
      opis: values.opis,
      katPutovanja: { katPutovanjaId: 1 }, // hardcoded or to be updated later
      lokacija: {
        grad: values.lokacijaGrad,
        drzava: values.lokacijaDrzava,
      },
    };

    try {
      await addPutovanje(putovanjeData);
      message.success('Putovanje dodano.');

      const response = await fetchPutovanja();
      setPutovanja(response.data);

      setIsModalOpen(false);
      form.resetFields();
    } catch (err) {
      message.error('Greška pri spremanju putovanja.');
    }
  };

  const columns = [
    {
      title: 'Grad',
      dataIndex: ['lokacija', 'grad'],
      key: 'grad',
    },
    {
      title: 'Država',
      dataIndex: ['lokacija', 'drzava'],
      key: 'drzava',
    },
    {
      title: 'Datum početka',
      dataIndex: 'datumPocetka',
      key: 'datumPocetka',
    },
    {
      title: 'Datum završetka',
      dataIndex: 'datumZavrsetka',
      key: 'datumZavrsetka',
    },
  ];

  return (
    <div className="container">
      <div className="header">
        <h1>Putovanja</h1>
        <Button className="novo-button" onClick={openNewForm}>
          NOVO
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={putovanja}
        rowKey="id"
        pagination={{ pageSize: 5 }}
        onRow={(record) => ({
          onClick: () => navigate(`/putovanja/${record.id}/troskovi`),
        })}
      />

      <Modal
        title="Novo putovanje"
        open={isModalOpen}
        onCancel={handleModalCancel}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="lokacijaDrzava"
            label="Država"
            rules={[{ required: true, message: 'Unesite državu' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="lokacijaGrad"
            label="Grad"
            rules={[{ required: true, message: 'Unesite grad' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="dateRange"
            label="Datum početka i završetka"
            rules={[{ required: true, message: 'Odaberite datume' }]}
          >
            <RangePicker />
          </Form.Item>

          <Form.Item
            name="svrha"
            label="Svrha"
            rules={[{ required: true, message: 'Unesite svrhu' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="opis"
            label="Opis"
            rules={[{ required: true, message: 'Unesite opis' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item style={{ textAlign: 'right' }}>
            <Space>
              <Button onClick={handleModalCancel}>Odustani</Button>
              <Button type="primary" htmlType="submit">
                Spremi
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default PutovanjaList;
