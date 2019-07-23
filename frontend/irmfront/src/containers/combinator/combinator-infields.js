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
          val1: true,
          val2: true,
          val3: true,
          val4: true,
          val5: true,
          val6: true,
          val7: true,
          val8: true,
        }
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
      }
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
          if (!err) {
              this.props.onSubmit(
                  values.col1,
                  values.col2,
                  values.col3,
                  values.col4,
                  values.col5,
                  values.col6,
                  values.col7,
                  values.col8,
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
    
      handleCheckboxChange(e) {

        const target = e.target
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name
          this.setState({
            [name]: value
          });
        }



    render() {
        // var copyTextareaBtn = document.querySelector('.js-textareacopybtn')

        // copyTextareaBtn.addEventListener('click', function(event) {
        // var copyTextarea = document.querySelector('.js-copytextarea');
        // copyTextarea.focus();
        // copyTextarea.select();

        // try {
        //     var successful = document.execCommand('copy');
        //     var msg = successful ? 'successful' : 'unsuccessful';
        //     console.log('Copying text command was ' + msg);
        // } catch (err) {
        //     console.log('Oops, unable to copy');
        // }
        // });
        // if (this.props.combinator_result !== null) {
        //     var result =  this.props.combinator_result.replace(",", "\n")
        // }
        const { getFieldDecorator } = this.props.form;
        return (
            this.props.user_loading ?
            <Spin indicator={antIcon} />
            : this.props.isAuthenticated && this.props.user_groups === 1 ?
                <div className="container" >
                    <CombinatorSettings className="unselectable" />
                    <Form onSubmit={this.handleSubmit}>
                    <div><Checkbox type="checkbox" name="val1" checked={this.state.val1} onChange={this.handleCheckboxChange} style={{marginLeft: '4%', marginTop: '40px'}}>Столбец 1</Checkbox>
                        <Checkbox type="checkbox" name="val2" checked={this.state.val2} onChange={this.handleCheckboxChange} style={{marginLeft: '16.3%', marginTop: '40px'}}>Столбец 2</Checkbox>
                        <Checkbox type="checkbox" name="val3" checked={this.state.val3} onChange={this.handleCheckboxChange} style={{marginLeft: '16.1%', marginTop: '40px'}}>Столбец 3</Checkbox>
                        <Checkbox type="checkbox" name="val4" checked={this.state.val4} onChange={this.handleCheckboxChange} style={{marginLeft: '16.2%', marginTop: '40px'}}>Столбец 4</Checkbox>
                        </div>
                    
                    {getFieldDecorator('col1')(
                        <TextArea placeholder="Столбец 1" allowclear="true" style={{ height: '250px', width: '20%', resize: 'none', marginLeft: '50px', marginTop: '5px' }}/>,
                        )}
                                
                                       
                    {getFieldDecorator('col2')(
                        <TextArea placeholder="Столбец 2" allowclear="true" style={{ height: '250px', width: '20%', resize: 'none', marginLeft: '50px', marginTop: '5px' }}/>,
                        )}


                    {getFieldDecorator('col3')(
                        <TextArea placeholder="Столбец 3" allowclear="true" style={{ height: '250px', width: '20%', resize: 'none', marginLeft: '50px', marginTop: '5px' }}/>,
                        )}


                    {getFieldDecorator('col4')(
                        <TextArea placeholder="Столбец 4" allowclear="true" style={{ height: '250px', width: '20%', resize: 'none', marginLeft: '50px', marginTop: '5px' }}/>,
                        )}

                    <div><Checkbox type="checkbox" name="val5" checked={this.state.val5} onChange={this.handleCheckboxChange} style={{marginLeft: '4%', marginTop: '10px'}}>Столбец 5</Checkbox>
                        <Checkbox type="checkbox" name="val6" checked={this.state.val6} onChange={this.handleCheckboxChange} style={{marginLeft: '16.3%', marginTop: '10px'}}>Столбец 6</Checkbox>
                        <Checkbox type="checkbox" name="val7" checked={this.state.val7} onChange={this.handleCheckboxChange} style={{marginLeft: '16.1%', marginTop: '10px'}}>Столбец 7</Checkbox>
                        <Checkbox type="checkbox" name="val8" checked={this.state.val8} onChange={this.handleCheckboxChange} style={{marginLeft: '16.2%', marginTop: '10px'}}>Столбец 8</Checkbox>
                        </div>
                    {getFieldDecorator('col5')(
                        <TextArea placeholder="Столбец 5" allowclear="true" style={{ height: '250px', width: '20%', resize: 'none', marginLeft: '50px', marginTop: '5px' }}/>,
                        )}


                    {getFieldDecorator('col6')(
                        <TextArea placeholder="Столбец 6" allowclear="true" style={{ height: '250px', width: '20%', resize: 'none', marginLeft: '50px', marginTop: '5px' }}/>,
                        )}

                    {getFieldDecorator('col7')(
                        <TextArea placeholder="Столбец 7" allowclear="true" style={{ height: '250px', width: '20%', resize: 'none', marginLeft: '50px', marginTop: '5px' }}/>,
                        )}


                    {getFieldDecorator('col8')(
                        <TextArea placeholder="Столбец 8" allowclear="true" style={{ height: '250px', width: '20%', resize: 'none', marginLeft: '50px', marginTop: '5px' }}/>,
                        )}


                    <Button type="primary" htmlType="submit" style={{marginTop: '40px', height: '45px', width: '30%'}} >Скомбинировать</Button>
                    <Button type="default" size="large" onClick={this.copyText} style={{position: 'sticky', marginLeft: '45%', width: '25%'}}>Скопировать результат</Button>
                    <div style={{marginTop: '10px', marginLeft: '80%'}}>
                        <Popover content="Скачать в .XLS">
                            <Button type="primary" shape="circle" icon="download" size={"default"} />
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
        onSubmit: (col1, col2, col3, col4, col5, col6, col7, col8, token) => dispatch(actions.combinatorAction(col1, col2, col3, col4, col5, col6, col7, col8, token )) 
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(WrappedRCombinatorForm);
