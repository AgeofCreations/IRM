import { Input, Button, Popover, Icon, Spin} from 'antd';
import React from 'react'
import { connect } from 'react-redux'
import CombinatorSettings from './combinator-settings'

const { TextArea } = Input;
const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

class Combinator extends React.Component {
    render() {
        return (
            this.props.user_loading ?
            <Spin indicator={antIcon} />
            : this.props.token !== null && this.props.user_groups === 1 ?
                <div className="container" >
                    <CombinatorSettings className="unselectable" />
                    <TextArea type="textarea" placeholder="Стоблец 1" allowclear="true" style={{ height: '250px', width: '20%', resize: 'none', marginLeft: '50px', marginTop: '30px' }}/>
                    <TextArea type="textarea" placeholder="Столбец 2" allowclear="true" style={{ height: '250px', width: '20%', resize: 'none', marginLeft: '50px', marginTop: '30px' }}/>
                    <TextArea type="textarea" placeholder="Столбец 3" allowclear="true" style={{ height: '250px', width: '20%', resize: 'none', marginLeft: '50px', marginTop: '30px' }}/>
                    <TextArea type="textarea" placeholder="Столбец 4" allowclear="true" style={{ height: '250px', width: '20%', resize: 'none', marginLeft: '50px', marginTop: '30px' }}/>
                    <TextArea type="textarea" placeholder="Столбец 5" allowclear="true" style={{ height: '250px', width: '20%', resize: 'none', marginLeft: '50px', marginTop: '30px' }}/>
                    <TextArea type="textarea" placeholder="Столбец 6" allowclear="true" style={{ height: '250px', width: '20%', resize: 'none', marginLeft: '50px', marginTop: '30px' }}/>
                    <TextArea type="textarea" placeholder="Столбец 7" allowclear="true" style={{ height: '250px', width: '20%', resize: 'none', marginLeft: '50px', marginTop: '30px' }}/>
                    <TextArea type="textarea" placeholder="Столбец 8" allowclear="true" style={{ height: '250px', width: '20%', resize: 'none', marginLeft: '50px', marginTop: '30px' }}/>
                    <Button type="primary" style={{marginTop: '40px', height: '45px', width: '30%'}} >Скомбинировать</Button>
                    <Button type="default" size="large" style={{position: 'sticky', marginLeft: '45%', width: '25%'}}>Скопировать результат</Button>
                    <div style={{marginTop: '10px', marginLeft: '80%'}}>
                        <Popover content="Скачать в .XLS">
                            <Button type="primary" shape="circle" icon="download" size={"default"} />
                        </Popover>,
                        <Popover content="Скачать в .CSV"> 
                            <Button type="default" shape="circle" icon="download" size={"default"} style={{marginLeft: '50%'}} />
                        </Popover>
                    </div>
                    <TextArea type="textarea" placeholder="Results" disabled="true" defaultValue="Тут будет результат" autosize={{minRows: 2, maxRows: 6}} style={{marginTop: '20px'}} />
                    <Button type="danger" size="large" style={{position: 'sticky', marginLeft: '75%', width: '25%', marginTop: '25px'}}>Очистить поля</Button>
                </div>

                : this.props.token !== null && this.props.user_groups !== 1 ?
                <div>Тебе не хватает прав.</div>
                :
                <div>Сначала залогинься мрась</div>
                );
            }
        }

const mapStateToProps = (state) => {
    return {
        user_error: state.user_error,
        user_groups: state.user_groups,
        token: state.token,
        user_loading: state.user_loading
    }
}
export default connect(mapStateToProps)(Combinator);
