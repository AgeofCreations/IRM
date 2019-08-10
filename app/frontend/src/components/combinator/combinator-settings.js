import { Collapse, Checkbox } from 'antd';
import React from 'react'

const Panel = Collapse.Panel;



class CombinatorSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      combinateDoubles: false,
      deteleTabs: true,
      deleteSpaces: true,
      ignoreEmptyRows: true
    }
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
  }

  handleCheckboxChange(e) {

    const target = e.target
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name
      this.setState({
        [name]: value
      });
    }


  render(){
    return(
        <Collapse bordered={true} defaultActiveKey={['']}>
          <Panel header="Показать настройки" key="1">
            <div>
              <div style={{width: '18%'}}>
                <p>Результат</p>
                <Checkbox type="checkbox" name="combinateDoubles" checked={this.state.combinateDoubles} onChange={this.handleCheckboxChange} style={{marginLeft: '8px'}}>Пересекать дубли</Checkbox>
                <Checkbox type="checkbox" name="deteleTabs" checked={this.state.deteleTabs} onChange={this.handleCheckboxChange}>Удалить табуляцию</Checkbox>
                <Checkbox type="checkbox" name="deleteSpaces" checked={this.state.deleteSpaces} onChange={this.handleCheckboxChange}>Удалить лишние пробелы</Checkbox>
                <Checkbox type="checkbox" name="ignoreEmptyRows" checked={this.state.ignoreEmptyRows} onChange={this.handleCheckboxChange} style={{marginLeft: '8px'}}>Игнорировать пустые строки</Checkbox>
              </div>
            </div>
          </Panel>
        </Collapse>
        )
    }
}

export default CombinatorSettings;