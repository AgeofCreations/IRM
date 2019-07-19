import { Input, Button, Popover, Icon, Spin, Form, Checkbox} from 'antd';
import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../../store/actions/combinator'
import CombinatorSettings from '../../components/combinator/combinator-settings'

const { TextArea } = Input;
const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

class CombinatorForm extends React.Component {
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

    // makeResult = () => {
    //     var result =  this.props.combinator_result.replace(",", "\n")
    // }

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

                    {getFieldDecorator('col1')(
                        <TextArea placeholder="Столбец 1" allowclear="true" style={{ height: '250px', width: '20%', resize: 'none', marginLeft: '50px', marginTop: '30px' }}/>,
                        )}
                                
                                       
                    {getFieldDecorator('col2')(
                        <TextArea placeholder="Столбец 2" allowclear="true" style={{ height: '250px', width: '20%', resize: 'none', marginLeft: '50px', marginTop: '30px' }}/>,
                        )}


                    {getFieldDecorator('col3')(
                        <TextArea placeholder="Столбец 3" allowclear="true" style={{ height: '250px', width: '20%', resize: 'none', marginLeft: '50px', marginTop: '30px' }}/>,
                        )}


                    {getFieldDecorator('col4')(
                        <TextArea placeholder="Столбец 4" allowclear="true" style={{ height: '250px', width: '20%', resize: 'none', marginLeft: '50px', marginTop: '30px' }}/>,
                        )}


                    {getFieldDecorator('col5')(
                        <TextArea placeholder="Столбец 5" allowclear="true" style={{ height: '250px', width: '20%', resize: 'none', marginLeft: '50px', marginTop: '30px' }}/>,
                        )}


                    {getFieldDecorator('col6')(
                        <TextArea placeholder="Столбец 6" allowclear="true" style={{ height: '250px', width: '20%', resize: 'none', marginLeft: '50px', marginTop: '30px' }}/>,
                        )}


                    {getFieldDecorator('col7')(
                        <TextArea placeholder="Столбец 7" allowclear="true" style={{ height: '250px', width: '20%', resize: 'none', marginLeft: '50px', marginTop: '30px' }}/>,
                        )}


                    {getFieldDecorator('col8')(
                        <TextArea placeholder="Столбец 8" allowclear="true" style={{ height: '250px', width: '20%', resize: 'none', marginLeft: '50px', marginTop: '30px' }}/>,
                        )}


                    <Button type="primary" htmlType="submit" style={{marginTop: '40px', height: '45px', width: '30%'}} >Скомбинировать</Button>
                    <Button type="default" size="large" style={{position: 'sticky', marginLeft: '45%', width: '25%'}}>Скопировать результат</Button>
                    <div style={{marginTop: '10px', marginLeft: '80%'}}>
                        <Popover content="Скачать в .XLS">
                            <Button type="primary" shape="circle" icon="download" size={"default"} />
                        </Popover>,
                        <Popover content="Скачать в .CSV"> 
                            <Button type="default" shape="circle" icon="download" size={"default"} style={{marginLeft: '50%'}} />
                        </Popover>
                    </div>
                    <TextArea placeholder="Тут будет результат" disabled={false} value={this.props.combinator_result} autosize={{minRows: 2, maxRows: 6}} style={{marginTop: '20px'}}></TextArea>
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
        combinator_result: state.combinatorReducer.combinator_result
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onSubmit: (col1, col2, col3, col4, col5, col6, col7, col8, token) => dispatch(actions.combinatorAction(col1, col2, col3, col4, col5, col6, col7, col8, token )) 
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(WrappedRCombinatorForm);
