import { Input, Button, Popover} from 'antd';
import React from 'react'
import CombinatorSettings from './combinator-settings'
const { TextArea } = Input;

class Combinator extends React.Component {
    render() {
        return (
    <div class="container" >
        <CombinatorSettings />
    <TextArea type="textarea" placeholder="Column 1" allowclear="true" style={{ height: '250px', width: '20%', resize: 'none', marginLeft: '50px', marginTop: '30px' }}/>
    <TextArea type="textarea" placeholder="Column 2" allowclear="true" style={{ height: '250px', width: '20%', resize: 'none', marginLeft: '50px', marginTop: '30px' }}/>
    <TextArea type="textarea" placeholder="Column 3" allowclear="true" style={{ height: '250px', width: '20%', resize: 'none', marginLeft: '50px', marginTop: '30px' }}/>
    <TextArea type="textarea" placeholder="Column 4" allowclear="true" style={{ height: '250px', width: '20%', resize: 'none', marginLeft: '50px', marginTop: '30px' }}/>
    <TextArea type="textarea" placeholder="Column 5" allowclear="true" style={{ height: '250px', width: '20%', resize: 'none', marginLeft: '50px', marginTop: '30px' }}/>
    <TextArea type="textarea" placeholder="Column 6" allowclear="true" style={{ height: '250px', width: '20%', resize: 'none', marginLeft: '50px', marginTop: '30px' }}/>
    <TextArea type="textarea" placeholder="Column 7" allowclear="true" style={{ height: '250px', width: '20%', resize: 'none', marginLeft: '50px', marginTop: '30px' }}/>
    <TextArea type="textarea" placeholder="Column 8" allowclear="true" style={{ height: '250px', width: '20%', resize: 'none', marginLeft: '50px', marginTop: '30px' }}/>
    <tr />
    <Button type="primary" style={{marginTop: '40px', height: '45px', width: '30%'}} >Combinate</Button>
    <Button type="default" size="large" style={{position: 'sticky', marginLeft: '45%', width: '25%'}}>Copy result</Button>
    <div style={{marginTop: '10px', marginLeft: '80%'}}>
        <Popover content="Скачать в .XLS">
            <Button type="primary" shape="circle" icon="download" size={"default"} />
        </Popover>,
        <Popover content="Скачать в .CSV">
            <Button type="default" shape="circle" icon="download" size={"default"} style={{marginLeft: '50%'}} />
        </Popover>
    </div>
    <tr />
    <TextArea type="textarea" placeholder="Results" disabled="true" defaultValue="Тут будет результат" autosize={{minRows: 2, maxRows: 6}} style={{marginTop: '20px'}} />
    <Button type="danger" size="large" style={{position: 'sticky', marginLeft: '75%', width: '25%', marginTop: '25px'}}>Очистить поля</Button>
    </div>
        );
    }
}

export default Combinator;
