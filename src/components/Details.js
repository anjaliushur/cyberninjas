import React,{useContext,useState} from 'react'
import {ContextConfig} from '../ContextConfig'
import {Table,Card,Row,Col,Modal,Button} from 'react-bootstrap';
import './component.css'
import moment from 'moment';
import axios from 'axios'

const CustomTable = () => {
   const {job} = useContext(ContextConfig)
   const [show, setShow] = useState(false);
   const [jobLogs,setJobLogs] = useState('')

   const handleClose = () => setShow(false);
   const handleShow = () => setShow(true);

   const convertToHour = (ms) => {
    let finalString = ''
    let seconds = ms / 1000;
    const hours = parseInt(seconds / 3600);
    if (hours > 0) finalString = finalString + hours + "h "
    seconds = seconds % 3600;
    const minutes = parseInt(seconds / 60);
    if (minutes > 0) finalString = finalString + minutes + "m "
    seconds = parseInt(seconds % 60);
    finalString = finalString + seconds + "s "
    return finalString;
    }

   const getLogs = async(item) => {
    try {
        const resp = await axios.get(`https://e490ca792fba00b1834fc44d36a583eb.serveo.net/logs?jobName=${item.name}&nameSpace=${item.nameSpace}`)    
        setJobLogs(resp.data)
        handleShow()
    } catch (error) {
        console.log('error')
    }
   }
  
   return (
    <>
    <div className='pt-4 pb-4'>
        <h3>Job Name : {job?.jobName || ''}</h3>
    </div>
    <Card className='customcard mb-5'>
        <Card.Body className='cardbody'>
            <Row>
                <Col>
                 <div className='cardItem'>NameSpace : {job?.namespace}</div>
                 <div className='cardItem'>Schedule : {job?.schedule}</div>
                 <div className='cardItem'>Last Run Status : {job?.lastRunStatus}</div>
                </Col>
                <Col>
                 <div className='cardItem'>Last Run : {job?.lastRun}</div>
                 <div className='cardItem'>Last Run Duration : {job?.lastRunDuration}</div>
                 <div className='cardItem'>Next Run : {job?.nextRun}</div>
                </Col>
            </Row>
        </Card.Body>
    </Card>
    <Table striped>
        <thead>
        <tr>
            <th>Name</th>
            <th>NameSpace</th>
            <th>Start Time</th>
            <th>Duration</th>
            <th>Status</th>
            <th></th>
        </tr>
        </thead>
        <tbody>
        {job?.jobs && job.jobs.length && job.jobs.map((item)=> {
        return(
            <tr>
                <td>{item.name}</td>
                <td>{item.nameSpace}</td>
                <td>{moment(new Date(item.startTime)).format("MM/DD/YY  hh:mm:ss")}</td>
                <td>{convertToHour(item.duration)}</td>
                <td>{item.status}</td>
                <td><Button className='viewButton' onClick={() => getLogs(item)}>Show Logs</Button></td>
            </tr>
            )
        })}
        </tbody>
    </Table>
    <Modal show={show} onHide={handleClose}>
        <div className="terminal-container">
          <pre className="terminal-output">
            {jobLogs}
          </pre>
        </div>
    </Modal>
    </>
   )
}

export default CustomTable