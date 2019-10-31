
import React from 'react';
import 'antd/dist/antd.css';
import { Table, Input, Button, Form, DatePicker, Statistic, Col, Row, Modal, InputNumber } from 'antd';
import axios from 'axios'
import backendURL from '../../consts'
import { Link } from 'react-router-dom'

const EditableContext = React.createContext();
const {MonthPicker} = DatePicker;
const token = localStorage.getItem('token');

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const pagination = {
  pageSize: 100,
  defaultCurrent: 1}
const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
  state = {
    editing: false,
  };

  toggleEdit = () => {
    const editing = !this.state.editing;
    this.setState({ editing }, () => {
      if (editing) {
        this.input.focus();
      }
    });
  };

  save = e => {
    const { record, handleSave } = this.props;
    this.form.validateFields((error, values) => {
      if (error && error[e.currentTarget.id]) {
        return;
      }
      this.toggleEdit();
      handleSave({ ...record, ...values });
    });
  };

  renderCell = form => {
    this.form = form;
    const { children, dataIndex, record, title } = this.props;
    const { editing } = this.state;
    return editing ? (
      <Form.Item style={{ margin: 0 }}>
        {form.getFieldDecorator(dataIndex, {
          rules: [
            {
              required: true,
              message: `${title} не должен быть пустым.`,
            },
          ],
          initialValue: record[dataIndex],
        })(<Input ref={node => (this.input = node)} onPressEnter={this.save} onBlur={this.save} />)}
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{ paddingRight: 24 }}
        onClick={this.toggleEdit}
      >
        {children}
      </div>
    );
  };

  render() {
    const {
      editable,
      dataIndex,
      title,
      record,
      index,
      handleSave,
      children,
      ...restProps
    } = this.props;
    return (
      <td {...restProps}>
        {editable ? (
          <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
        ) : (
          children
        )}
      </td>
    );
  }
}


class MetricsTest extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: 'Название категории',
        dataIndex: 'name',
        'key': 'name',
        render: (text, record) => <Link to={`/metrics/third_level_categories/${record.id}`}>{text}</Link>,
      },
      {
        title: 'План по траффику',
        dataIndex: 'category_plan',
        key: 'category_plan',
        editable: true,
      },

      {
        title: 'Первая неделя',
        dataIndex: 'weeks_data[0].weekly_traffic',
        key: 'first_week_col',
        render: (text) => <span>{text}</span>,
      },

      {
          title: 'Вторая неделя',
          dataIndex: 'weeks_data[1].weekly_traffic',
          key: 'second_week',
          render: (text) => <span>{text}</span>,
  
        },

        {
          title: 'Третья неделя',
          dataIndex: 'weeks_data[2].weekly_traffic',
          key: 'third_week',
          render: (text) => <span>{text}</span>,
  
        },

        {
          title: 'Четвёртая неделя',
          dataIndex: 'weeks_data[3].weekly_traffic',
          key: 'fourth_week',
          render: (text) => <span>{text}</span>,
  
        },

        {
          title: 'Пятая неделя',
          dataIndex: 'weeks_data[4].weekly_traffic',
          key: 'fifth_week',
          render: (text) => <span>{text}</span>,
  
        },

        {
          title: 'Суммарно за месяц',
          dataIndex: 'category_factual',
          key: 'monthly_sum',
          render: (text) => <span>{text}</span>,
  
        },

        {
          title: 'Процент выполнения',
          dataIndex: 'percentage',
          key: 'percentage',
          render: (text) => <span>{text + '%'}</span>,
  
        },
    ];

    this.state = {
        data: [],
        month: '',
        monthly_target: 0,
        site_target: 0,
        monthly_factual: 0,
        site_factual: 0,
        new_site_target: '',
        new_monthly_factual: '',
        first_week: 'Первая неделя',
        second_week: 'Вторая неделя',
        third_weeek: 'Третья неделя',
        fourth_week: 'Четвёртая неделя',
        fifth_week: 'Пятая неделя',
    };
  }

  info() {
    Modal.info({
      title: 'Прочитанные уведомления',
      content: (<div>
        <p>Это - статистика из Яндекс.Метрика.</p>
        <p>Для просмотра статистики выберите месяц и нажмите кнопку "OK"</p>
        <p>План по траффику на сайте и суммарный по категориям - редактируется при помощи соответсвующих полей с надписью "Новая цель".</p>
        <p>План по траффику для отдельных категорий редактируется нажатием на соответствующую ячейку.</p>
        <p>Данные в полях и ячейках применяются нажатием клавиши Enter.</p>
        <p>Временные интервалы формируются автоматически. Сбор данных из метрики происходит автоматически и ежедневно.</p>
        <p>Список категорий для снятия статистики можно изменить во вкладке Пользователь --> Управление.</p>
      </div>),
      onOk() {},
    });
  }

  fetchcats = (params = {}) => {
    this.setState({ loading: true });
    axios.post(`${backendURL}/metrics/month/`, {
        month: this.state.month,
  })
      .then(res => {
      const pagination = { ...this.state.pagination };
      pagination.total = res.data.count;
      pagination.pageSize = 100
      pagination.position = 'both'
      this.setState({
        loading: false,
        data: res.data.categories,
        monthly_target: res.data.monthly_target,
        site_target: res.data.site_target,
        monthly_factual: res.data.monthly_factual,
        site_factual: res.data.site_factual,
        multiplier: res.data.multiplier,
        first_week: res.data.categories[0].weeks_data[0].first_day + '-' + res.data.categories[0].weeks_data[0].last_day,
        second_week: res.data.categories[0].weeks_data[1].first_day + '-' + res.data.categories[0].weeks_data[1].last_day,
        third_week: res.data.categories[0].weeks_data[2].first_day + '-' + res.data.categories[0].weeks_data[2].last_day,
        fourth_week: res.data.categories[0].weeks_data[3].first_day + '-' + res.data.categories[0].weeks_data[3].last_day,
      });
    });
  };
  addcats = (params = {}) => {
    axios.post(`${backendURL}/metrics/add/category/`, {
        ...params
    })
    setTimeout(this.fetchcats, 500)
  }

  onChangeMonth = (date, dateString) => {
    this.setState({
        month: dateString,
    })
  }

  handleNewTarget = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        axios.post(`${backendURL}/metrics/add/monthly/`, {
          month: this.state.month,
          site_target: values.site_target,
        })  
        setTimeout(this.fetchcats, 500)
      }
    });
  };

  handleSave = row => {
    const newData = [...this.state.data];
    const index = newData.findIndex(item => row.key === item.key);
    const item = newData[index];
    const params = {
        'month': this.state.month,
        'updating_category': row.name,
        'new_plan': row.category_plan,
    }
    this.addcats(params)
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
  };
  render() {
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    };
    const columns = this.columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave,
        }),
      };
    });
    const { getFieldDecorator } = this.props.form;
    return (
            <div>
                        {
            token ?
            <div>
        <Button type="default" size="small" style={{'position': 'absolute', 'right': '20%'}}><Link to="/metrics/third_level_categories/">Категории 3-го уровня</Link></Button>
        <MonthPicker onChange={this.onChangeMonth} placeholder="Выберите месяц" />
        <Button type="primary" style={{'marginLeft': '20px', 'marginBottom': '20px'}} onClick={this.fetchcats}>OK</Button>
        <Button icon="question-circle" style={{'position': 'absolute', 'right': '10%'}} onClick={this.info}></Button>

        <Row gutter={16}>
            <Col span={3}>
                <Statistic title="Цель траффика на сайте" value={this.state.site_target} />
                <Statistic title="Траффик на сайте" value={this.state.site_factual} />
                <Statistic title="Процент выполнения" value={Math.round(this.state.site_factual / this.state.site_target * 100)+ '%'} />
            </Col>
            <Col span={7}>
            
            <Form onSubmit={this.handleNewTarget} className="login-form">
                    <Form.Item style={{marginTop: '20px'}}>
                    <span className="ant-form-text">к предыдущему периоду: {this.state.multiplier}</span>
                    {getFieldDecorator('site_target', {
                        rules: [{ required: true, message: 'Введите цель для сайта' }],
                    })(
                        
                        <InputNumber
                        formatter={value => `${value}%`}
                        placeholder="Новая цель"
                        value={this.state.site_target}
                        />,
                        <span className="ant-form-text">к предыдущему периоду</span>
                        
                    )}
                    </Form.Item>
                    </Form>
            </Col>
            <Col span={9}>
                <Statistic title="Цель по отслеживаемым категориям" value={this.state.monthly_target} />
                <Statistic title="Траффик по отслеживаемым категориям" value={this.state.monthly_factual} />
                <Statistic title="Процент выполнения" value={Math.round(this.state.monthly_factual / this.state.monthly_target * 100)+ '%'} />
            </Col>
        </Row>
        <Table
          components={components}
          rowClassName={() => 'editable-row'}
          bordered
          pagination={pagination}
          dataSource={this.state.data}
          columns={columns}
        />
              </div>
                :
                <div>Только для авторизованных пользователей</div>
                }
                </div>
    );
  }
}
const WrappedMetricsTest = Form.create({ name: 'normal_login' })(MetricsTest);

export default WrappedMetricsTest;