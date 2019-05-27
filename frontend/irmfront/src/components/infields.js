import { Input, Button } from 'antd';
import React from 'react'

const { TextArea } = Input;

class Combinator extends React.Component {
    render() {
        return (
    <div class="container" >
    <TextArea type="textarea" placeholder="Column 1" allowclear="true" style={{ height: '250px', width: '20%', resize: 'none', marginLeft: '50px', marginTop: '30px' }}/>
    <TextArea type="textarea" placeholder="Column 2" allowclear="true" style={{ height: '250px', width: '20%', resize: 'none', marginLeft: '50px', marginTop: '30px' }}/>
    <TextArea type="textarea" placeholder="Column 3" allowclear="true" style={{ height: '250px', width: '20%', resize: 'none', marginLeft: '50px', marginTop: '30px' }}/>
    <TextArea type="textarea" placeholder="Column 4" allowclear="true" style={{ height: '250px', width: '20%', resize: 'none', marginLeft: '50px', marginTop: '30px' }}/>
    <TextArea type="textarea" placeholder="Column 5" allowclear="true" style={{ height: '250px', width: '20%', resize: 'none', marginLeft: '50px', marginTop: '30px' }}/>
    <TextArea type="textarea" placeholder="Column 6" allowclear="true" style={{ height: '250px', width: '20%', resize: 'none', marginLeft: '50px', marginTop: '30px' }}/>
    <TextArea type="textarea" placeholder="Column 7" allowclear="true" style={{ height: '250px', width: '20%', resize: 'none', marginLeft: '50px', marginTop: '30px' }}/>
    <TextArea type="textarea" placeholder="Column 8" allowclear="true" style={{ height: '250px', width: '20%', resize: 'none', marginLeft: '50px', marginTop: '30px' }}/>
    <tr></tr>
    <Button type="primary" style={{marginTop: '40px', height: '35px'}} block>Combinate</Button>
    </div>
        );
    }
}

export default Combinator;
