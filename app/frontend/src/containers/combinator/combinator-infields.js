import { Input, Button, Popover, Icon, Spin, Form, Checkbox, Modal} from 'antd';
import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../../store/actions/combinator'
import CombinatorSettings from '../../components/combinator/combinator-settings'
import NotLoggedIn from '../../components/accessDenied/notLoggedIn'

const { TextArea } = Input;
const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

class CombinatorForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          col1: true,
          col2: true,
          col3: true,
          col4: true,
          col5: true,
          col6: true,
          col7: true,
          col8: true,
          allLength: 0,
          length1: 1,
          length2: 1,
          length3: 1,
          length4: 1,
          length5: 1,
          length6: 1,
          length7: 1,
          length8: 1,
          target8: '1111'

        }
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
        this.onChangeColumn = this.onChangeColumn.bind(this);
      }

    warning() {
        Modal.warning({
          title: 'Такое количество результатов не может быть отображено.',
          content: 'Мы не можем отобразить более 100000 результатов прямо на странице. Вместо этого воспользуйтесь фунцией скачивания в одном из форматов.',
        });
      }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
        if (this.state.allLength > 100000) {
                this.warning()
        }
          if (!err) {
              this.props.onSubmit(
                  this.state.col1 ? values.value1 : ' ',
                  this.state.col2 ? values.value2 : ' ',
                  this.state.col3 ? values.value3 : ' ',
                  this.state.col4 ? values.value4 : ' ',
                  this.state.col5 ? values.value5 : ' ',
                  this.state.col6 ? values.value6 : ' ',
                  this.state.col7 ? values.value7 : ' ',
                  this.state.col8 ? values.value8 : ' ',
              );
          }
        }
        );
      };
    
    copyText = e => {
        var copyText = document.getElementById("result");
        copyText.select();
        document.execCommand("copy");
      }
    
    handleCheckboxChange = e => {
        const target = e.target
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name
          this.setState({
            [name]: value
          });
        }

    onChangeColumn(e) {
        const target = e.target;

        var len = target.value.endsWith("\n") ? target.value.slice(0, -1) : target.value

        var length1 = target.name === 'target1' ? len.split('\n').length : this.state.length1
        var length2 = target.name === 'target2' ? len.split('\n').length : this.state.length2
        var length3 = target.name === 'target3' ? len.split('\n').length : this.state.length3
        var length4 = target.name === 'target4' ? len.split('\n').length : this.state.length4
        var length5 = target.name === 'target5' ? len.split('\n').length : this.state.length5
        var length6 = target.name === 'target6' ? len.split('\n').length : this.state.length6
        var length7 = target.name === 'target7' ? len.split('\n').length : this.state.length7
        var length8 = target.name === 'target8' ? len.split('\n').length : this.state.length8

        const allLengthVal = (
            length1 * length2 * length3 * length4 * length5 *
            length6 * length7 * length8
            )
                    this.setState({
                        allLength: allLengthVal,
                        length1: length1,
                        length2: length2,
                        length3: length3,
                        length4: length4,
                        length5: length5,
                        length6: length6,
                        length7: length7,
                        length8: length8
            });
          }
    handleColumnClear = e => {
        const target = e.target
        const value = target.type === 'danger' ? '' : target.value;
        const name = target.name
        
        console.log(this.state.target8)
    }

    clearFields = () => {
        this.props.form.resetFields();
        this.setState({allLength: 0})
        this.props.onClear()
    }

    saveTXT = () => {
        var FileSaver = require('file-saver');
        var blob = new Blob([this.props.combinator_result], {type: "text/plain;charset=utf-8"});
        FileSaver.saveAs(blob, "CombinatorResults.txt");
    }
    saveCSV = () => {
        var FileSaver = require('file-saver');
        var blob = new Blob([this.props.combinator_result], {type: "text/plain;charset=utf-8"});
        FileSaver.saveAs(blob, "CombinatorResults.csv");
    }



    render() {
        const { getFieldDecorator } = this.props.form;
        console.log(this.props)
        return (
            <div>
                {
            this.props.user_loading ?
            <Spin indicator={antIcon} />
            : this.props.token && this.props.user_groups === 1 ?
                <div className="container" >
                    <CombinatorSettings className="unselectable" />
                    <Form  onSubmit={this.handleSubmit}>
                        <div>
                            <Checkbox type="checkbox" name="col1" checked={this.state.col1} onChange={this.handleCheckboxChange} style={{marginLeft: '4%', marginTop: '40px'}}>Столбец 1</Checkbox>
                            <Button type="danger" name="target1" icon="close" onClick={this.handleCheckboxChange}></Button>
                            <Checkbox type="checkbox" name="col2" checked={this.state.col2} onChange={this.handleCheckboxChange} style={{marginLeft: '16.3%', marginTop: '40px'}}>Столбец 2</Checkbox>
                            <Checkbox type="checkbox" name="col3" checked={this.state.col3} onChange={this.handleCheckboxChange} style={{marginLeft: '16.1%', marginTop: '40px'}}>Столбец 3</Checkbox>
                            <Checkbox type="checkbox" name="col4" checked={this.state.col4} onChange={this.handleCheckboxChange} style={{marginLeft: '16.2%', marginTop: '40px'}}>Столбец 4</Checkbox>
                        </div>
                    
                    {getFieldDecorator('value1')( 
                        <TextArea placeholder="Столбец 1" id="combinatorForm" name="target1" onChange={this.onChangeColumn} allowclear="true" style={{ height: '250px', width: '20%', resize: 'none', marginLeft: '50px', marginTop: '5px' }}/>,
                        )}
                                
                                       
                    {getFieldDecorator('value2')(
                        <TextArea placeholder="Столбец 2" id="column" name="target2" onChange={this.onChangeColumn} allowclear="true" style={{ height: '250px', width: '20%', resize: 'none', marginLeft: '50px', marginTop: '5px' }}/>,
                        )}


                    {getFieldDecorator('value3')(
                        <TextArea placeholder="Столбец 3" name="target3" onChange={this.onChangeColumn} allowclear="true" style={{ height: '250px', width: '20%', resize: 'none', marginLeft: '50px', marginTop: '5px' }}/>,
                        )}


                    {getFieldDecorator('value4')(
                        <TextArea placeholder="Столбец 4" name="target4" onChange={this.onChangeColumn} allowclear="true" style={{ height: '250px', width: '20%', resize: 'none', marginLeft: '50px', marginTop: '5px' }}/>,
                        )}

                    <div><Checkbox type="checkbox" name="col5" checked={this.state.col5} onChange={this.handleCheckboxChange} style={{marginLeft: '4%', marginTop: '10px'}}>Столбец 5</Checkbox>
                        <Checkbox type="checkbox" name="col6" checked={this.state.col6} onChange={this.handleCheckboxChange} style={{marginLeft: '16.3%', marginTop: '10px'}}>Столбец 6</Checkbox>
                        <Checkbox type="checkbox" name="col7" checked={this.state.col7} onChange={this.handleCheckboxChange} style={{marginLeft: '16.1%', marginTop: '10px'}}>Столбец 7</Checkbox>
                        <Checkbox type="checkbox" name="col8" checked={this.state.col8} onChange={this.handleCheckboxChange} style={{marginLeft: '16.2%', marginTop: '10px'}}>Столбец 8</Checkbox>
                        <Button type="danger" name="target8" icon="close" onClick={this.handleColumnClear}></Button>
                        </div>
                    {getFieldDecorator('value5')(
                        <TextArea placeholder="Столбец 5" name="target5" onChange={this.onChangeColumn} allowclear="true" style={{ height: '250px', width: '20%', resize: 'none', marginLeft: '50px', marginTop: '5px' }}/>,
                        )}


                    {getFieldDecorator('value6')(
                        <TextArea placeholder="Столбец 6" name="target6" onChange={this.onChangeColumn} allowclear="true" style={{ height: '250px', width: '20%', resize: 'none', marginLeft: '50px', marginTop: '5px' }}/>,
                        )}

                    {getFieldDecorator('value7')(
                        <TextArea placeholder="Столбец 7" name="target7" onChange={this.onChangeColumn} allowclear="true" style={{ height: '250px', width: '20%', resize: 'none', marginLeft: '50px', marginTop: '5px' }}/>,
                        )}


                    {getFieldDecorator('value8',)(
                        <TextArea ref= {el => this.todoTextElem = el} placeholder="Столбец 8" name="target8" onChange={this.onChangeColumn} allowclear="true" style={{ height: '250px', width: '20%', resize: 'none', marginLeft: '50px', marginTop: '5px' }}>{this.state.target8}</TextArea>,
                        )}


                        <Button type="primary" htmlType="submit" style={{marginTop: '40px', height: '45px', width: '30%'}}>Скомбинировать {this.state.allLength} фраз </Button>
                        <Button type="default" size="large" onClick={this.copyText} style={{position: 'sticky', marginLeft: '45%', width: '25%'}}>Скопировать результат</Button>
                        <div style={{marginTop: '10px', marginLeft: '80%'}}>
                        <Popover content="Скачать в .TXT">
                            <Button type="primary" onClick={this.saveTXT} shape="circle" icon="download" size={"default"} />
                        </Popover>,
                        <Popover content="Скачать в .CSV"> 
                            <Button type="default" onClick={this.saveCSV} shape="circle" icon="download" size={"default"} style={{marginLeft: '50%'}} />
                        </Popover>
                        </div>
                        <TextArea placeholder="Тут будет результат" disabled={false} id="result" value={this.state.allLength < 100000 ? this.props.combinator_result : "Нельзя отобразить более 100000 результатов. Скачайте в файле"} autosize={{minRows: 2, maxRows: 6}} style={{marginTop: '20px'}}></TextArea>
                        <Button type="danger" size="large" onClick={this.clearFields} style={{position: 'sticky', marginLeft: '75%', width: '25%', marginTop: '25px'}}>Очистить поля</Button>
                    </Form>
                </div>

                : this.props.token && this.props.user_groups !== 1 ?
                <div>Тебе не хватает прав.</div>
                :
                // <NotLoggedIn {...this.props}></NotLoggedIn>
                <div>Кто не залогинен, тот ничего не получет ога.</div>
                
                }
                </div>);
            }
        }

const WrappedRCombinatorForm = Form.create({ name: 'register' })(CombinatorForm);

const mapStateToProps = (state) => {
    return {
        user_error: state.authReducer.user_error,
        user_groups: state.authReducer.user_groups,
        token : state.authReducer.token,
        user_loading: state.authReducer.user_loading,
        combinator_result: state.combinatorReducer.combinator_result,
        combinator_loading: state.combinatorReducer.combinator_loading
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onSubmit: (value1, value2, value3, value4, value5, value6, value7, value8, token) => dispatch(actions.combinatorAction(value1, value2, value3, value4, value5, value6, value7, value8, token )), 
        onClear: () => dispatch(actions.combinatorClear())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(WrappedRCombinatorForm);
