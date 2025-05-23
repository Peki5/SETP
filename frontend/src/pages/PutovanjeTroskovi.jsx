import {
  Button,
  DatePicker,
  Form,
  InputNumber,
  Modal,
  Space,
  Table,
  Typography,
  message,
} from 'antd';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  addTrosak,
  deleteTrosak,
  fetchPutovanja,
  fetchSumaTroskova,
  fetchTroskovi,
  updateTrosak,
} from '../api';
import DeleteButton from '../components/DeleteButton';
import EditButton from '../components/EditButton';

const { Title } = Typography;

function PutovanjeTroskovi() {
  const { id } = useParams();
  const [troskovi, setTroskovi] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTrosak, setEditingTrosak] = useState(null);
  const [toDeleteId, setToDeleteId] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [putovanje, setPutovanje] = useState({
    drzava: '',
    grad: '',
    datumPocetka: '',
    datumZavrsetka: '',
  });
  const [suma, setSuma] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      try {
        const allPutovanja = await fetchPutovanja();
        const selectedPutovanje = allPutovanja.data.find(
          (p) => p.id === parseInt(id)
        );
        if (selectedPutovanje) {
          setPutovanje({
            drzava: selectedPutovanje.lokacija.drzava,
            grad: selectedPutovanje.lokacija.grad,
            datumPocetka: selectedPutovanje.datumPocetka,
            datumZavrsetka: selectedPutovanje.datumZavrsetka,
          });
        }

        const troskoviRes = await fetchTroskovi(id);
        setTroskovi(troskoviRes.data);

        const sumaRes = await fetchSumaTroskova(id);
        setSuma(sumaRes.data);
      } catch (error) {
        message.error('Greška pri učitavanju podataka.');
      }
    };

    loadData();
  }, [id]);

  const handleNewClick = () => {
    form.resetFields();
    setEditingTrosak(null);
    setIsModalOpen(true);
  };

  const onFinish = async (values) => {
    const formatted = {
      iznos: parseFloat(values.iznos),
      datumTroska: values.datumTroska.format('YYYY-MM-DD'),
    };

    try {
      if (editingTrosak) {
        await updateTrosak(editingTrosak.id, formatted);
        message.success('Trošak ažuriran.');
      } else {
        await addTrosak(id, formatted);
        message.success('Trošak dodan.');
      }
      const res = await fetchTroskovi(id);
      setTroskovi(res.data);
      const sumaRes = await fetchSumaTroskova(id);
      setSuma(sumaRes.data);
    } catch (err) {
      message.error('Greška pri spremanju.');
    }

    setIsModalOpen(false);
    setEditingTrosak(null);
    form.resetFields();
  };

  const openEditForm = (record) => {
    setEditingTrosak(record);
    form.setFieldsValue({
      iznos: record.iznos,
      datumTroska: dayjs(record.datumTroska),
    });
    setIsModalOpen(true);
  };

  const confirmDelete = (id) => {
    setToDeleteId(id);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    await deleteTrosak(toDeleteId);
    const res = await fetchTroskovi(id);
    setTroskovi(res.data);
    const sumaRes = await fetchSumaTroskova(id);
    setSuma(sumaRes.data);
    setIsDeleteModalOpen(false);
    setToDeleteId(null);
    message.success('Trošak obrisan.');
  };

  const columns = [
    {
      title: 'Iznos (€)',
      dataIndex: 'iznos',
      key: 'iznos',
      render: (value) => `${value.toFixed(2)} €`,
    },
    {
      title: 'Datum troška',
      dataIndex: 'datumTroska',
      key: 'datumTroska',
    },
    {
      title: 'Akcije',
      key: 'akcije',
      render: (_, record) => (
        <Space>
          <EditButton onClick={() => openEditForm(record)} />
          <DeleteButton onClick={() => confirmDelete(record.id)} />
        </Space>
      ),
    },
  ];

  return (
    <div className="container">
      <div className="header">
        <div>
          <Title level={2}>
            Troškovi: {putovanje.drzava}, {putovanje.grad}
          </Title>
          <Title level={4}>Suma Troškova: {suma.toFixed(2)} €</Title>
        </div>
        <Button className="novo-button" onClick={handleNewClick}>
          NOVO
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={troskovi}
        rowKey="id"
        pagination={false}
      />

      <Modal
        title={editingTrosak ? 'Uredi trošak' : 'Novi trošak'}
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          setEditingTrosak(null);
        }}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Iznos (€)"
            name="iznos"
            rules={[{ required: true, message: 'Unesite iznos' }]}
          >
            <InputNumber
              style={{ width: '100%' }}
              min={0.01}
              step={0.01}
              stringMode
              addonAfter="€"
            />
          </Form.Item>

          <Form.Item
            label="Datum troška"
            name="datumTroska"
            rules={[{ required: true, message: 'Odaberite datum troška' }]}
          >
            <DatePicker
              style={{ width: '100%' }}
              disabledDate={(current) =>
                current &&
                (current < dayjs(putovanje.datumPocetka) ||
                  current > dayjs(putovanje.datumZavrsetka))
              }
            />
          </Form.Item>

          <Form.Item style={{ textAlign: 'right' }}>
            <Space>
              <Button onClick={() => setIsModalOpen(false)}>Odustani</Button>
              <Button type="primary" htmlType="submit">
                Spremi
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        open={isDeleteModalOpen}
        onCancel={() => setIsDeleteModalOpen(false)}
        onOk={handleDeleteConfirm}
        okText="Obriši"
        cancelText="Odustani"
        title="Potvrda brisanja"
      >
        Jeste li sigurni da želite obrisati ovaj trošak?
      </Modal>
    </div>
  );
}

export default PutovanjeTroskovi;
