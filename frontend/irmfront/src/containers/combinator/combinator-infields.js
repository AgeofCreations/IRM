import { Input, Button, Popover, Icon, Spin, Form, Checkbox} from 'antd';
import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../../store/actions/combinator'
import CombinatorSettings from '../../components/combinator/combinator-settings'

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
          allLength: null,
          length1: 1,
          length2: 1,
          length3: 1,
          length4: 1,
          length5: 1,
          length6: 1,
          length7: 1,
          length8: 1

        }
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
        this.onChangeColumn = this.onChangeColumn.bind(this);
      }
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
          if (!err) {
              this.props.onSubmit(
                  values.value1,
                  values.value2,
                  values.value3,
                  values.value4,
                  values.value5,
                  values.value6,
                  values.value7,
                  values.value8,
              );
          }
        });
      };
    copyText() {
        /* Get the text field */
        var copyText = document.getElementById("result");
      
        /* Select the text field */
        copyText.select();
      
        /* Copy the text inside the text field */
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
    onChangeColumn(event) {
        var length1 = this.state.length1
        var length2 = this.state.length2
        var length3 = this.state.length3
        var length4 = this.state.length4
        var length5 = this.state.length5
        var length6 = this.state.length6
        var length7 = this.state.length7
        var length8 = this.state.length8
        const target = event.target;
        var length1 = target.name === 'target1' ? target.value.split('\n').length : length1
        var length2 = target.name === 'target2' ? target.value.split('\n').length : length2
        var length3 = target.name === 'target3' ? target.value.split('\n').length : length3
        var length4 = target.name === 'target4' ? target.value.split('\n').length : length4
        var length5 = target.name === 'target5' ? target.value.split('\n').length : length5
        var length6 = target.name === 'target6' ? target.value.split('\n').length : length6
        var length7 = target.name === 'target7' ? target.value.split('\n').length : length7
        var length8 = target.name === 'target8' ? target.value.split('\n').length : length8
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
        CheckValues = e => {
            console.log(this.state.allLength)
        }


    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            this.props.user_loading ?
            <Spin indicator={antIcon} />
            : this.props.isAuthenticated && this.props.user_groups === 1 ?
                <div className="container" >
                    <CombinatorSettings className="unselectable" />
                    <Form onSubmit={this.handleSubmit}>
                    <div><Checkbox type="checkbox" name="col1" checked={this.state.col1} onChange={this.handleCheckboxChange} style={{marginLeft: '4%', marginTop: '40px'}}>Столбец 1</Checkbox>
                        <Checkbox type="checkbox" name="col2" checked={this.state.col2} onChange={this.handleCheckboxChange} style={{marginLeft: '16.3%', marginTop: '40px'}}>Столбец 2</Checkbox>
                        <Checkbox type="checkbox" name="col3" checked={this.state.col3} onChange={this.handleCheckboxChange} style={{marginLeft: '16.1%', marginTop: '40px'}}>Столбец 3</Checkbox>
                        <Checkbox type="checkbox" name="col4" checked={this.state.col4} onChange={this.handleCheckboxChange} style={{marginLeft: '16.2%', marginTop: '40px'}}>Столбец 4</Checkbox>
                        </div>
                    
                    {getFieldDecorator('value1')(
                        <TextArea placeholder="Столбец 1" name="target1" onChange={this.onChangeColumn} allowclear="true" style={{ height: '250px', width: '20%', resize: 'none', marginLeft: '50px', marginTop: '5px' }}/>,
                        )}
                                
                                       
                    {getFieldDecorator('value2')(
                        <TextArea placeholder="Столбец 2" name="target2" onChange={this.onChangeColumn} allowclear="true" style={{ height: '250px', width: '20%', resize: 'none', marginLeft: '50px', marginTop: '5px' }}/>,
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


                    {getFieldDecorator('value8')(
                        <TextArea placeholder="Столбец 8" name="target8" onChange={this.onChangeColumn} allowclear="true" style={{ height: '250px', width: '20%', resize: 'none', marginLeft: '50px', marginTop: '5px' }}/>,
                        )}


                    <Button type="primary" htmlType="submit" style={{marginTop: '40px', height: '45px', width: '30%'}} >Скомбинировать {this.state.allLength} фраз </Button>
                    <Button type="default" size="large" onClick={this.copyText} style={{position: 'sticky', marginLeft: '45%', width: '25%'}}>Скопировать результат</Button>
                    <div style={{marginTop: '10px', marginLeft: '80%'}}>
                        <Popover content="Скачать в .XLS">
                            <Button type="primary" shape="circle" onClick={this.CheckValues} icon="download" size={"default"} />
                        </Popover>,
                        <Popover content="Скачать в .CSV"> 
                            <Button type="default" shape="circle" icon="download" size={"default"} style={{marginLeft: '50%'}} />
                        </Popover>
                    </div>
                    <TextArea placeholder="Тут будет результат" disabled={false} id="result" value={this.props.combinator_result} autosize={{minRows: 2, maxRows: 6}} style={{marginTop: '20px'}}></TextArea>
                    <Button type="danger" size="large" style={{position: 'sticky', marginLeft: '75%', width: '25%', marginTop: '25px'}}>Очистить поля</Button>
                    </Form>
                </div>

                : this.props.isAuthenticated && this.props.user_groups !== 1 ?
                <div>Тебе не хватает прав.</div>
                :
                <div>Сначала залогинься мрась</div>
                );
            }
        }

const WrappedRCombinatorForm = Form.create({ name: 'register' })(CombinatorForm);

const mapStateToProps = (state) => {
    return {
        user_error: state.authReducer.user_error,
        user_groups: state.authReducer.user_groups,
        isAuthenticated: state.authReducer.token !== null,
        user_loading: state.authReducer.user_loading,
        token: state.authReducer.token,
        combinator_result: state.combinatorReducer.combinator_result
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onSubmit: (value1, value2, value3, value4, value5, value6, value7, value8, token) => dispatch(actions.combinatorAction(value1, value2, value3, value4, value5, value6, value7, value8, token )) 
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(WrappedRCombinatorForm);
