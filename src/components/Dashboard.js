import React, { useEffect, useState,useContext } from 'react'
import { Row, Col } from 'react-bootstrap'
import './component.css'
import JobsTable from './JobsTable'
import Select from 'react-select';
import moment from 'moment';
import axios from 'axios'
import cronstrue from 'cronstrue';
import {ContextConfig} from '../ContextConfig'


const selectOptions = [{ value: '', label: 'All' }, { value: 'aflac', label: 'Aflac' }, { value: 'cigna', label: 'Cigna' }, { value: 'irislife', label: 'IrisLife' },{ value: 'usrs', label: 'USRS' }]


const columns = [{ field: 'jobName', label: 'Job Name' },
{ field: 'schedule', label: 'Schedule' },
{ field: 'namespace', label: 'NameSpace' },
{ field: 'lastRun', label: 'Last Run' },
{ field: 'lastRunStatus', label: 'Status' },
{ field: 'lastRunDuration', label: 'Last Run Duration' },
{ field: 'nextRun', label: 'Next Run' },]

const Dashboard = () => {
    const {job,setjob} = useContext(ContextConfig)
    const [filteredData, setFilteredData] = useState([])
    const [fullData, setFullData] = useState([])
    const [count, setCount] = useState()
    const [selectedOptions, setSelectedOption] = useState(selectOptions[0].value)

    const fetchdata = async () => {
        try {
            const resp = await axios.get('https://e490ca792fba00b1834fc44d36a583eb.serveo.net/jobs')
            
            const returnedData = resp.data.map((item) => {
                return {
                    ...item,
                    schedule: cronstrue.toString(item.schedule),
                    lastRunDuration: convertToHour(item?.lastRunDuration),
                    lastRun: convertToDate(item?.lastRun),
                    nextRun: convertToDate(item?.nextRun)
                }
            })
            setFullData(returnedData)
            setFilteredData(returnedData)
            setCount(returnedData?.length)
        } catch (error) {
            console.log('error')
        }
    }

    useEffect(() => {
        fetchdata()
    }, [])

    useEffect(() => {
        console.log(selectedOptions)
        if(selectedOptions.length) {
            const updatedFilter = fullData.filter(d => d.namespace === selectedOptions)
            setFilteredData(updatedFilter)
            setCount(updatedFilter.length)
        } else {
            setFilteredData(fullData)
            setCount(fullData?.length)
        }
    }, [selectedOptions])

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

    const convertToDate = (date) => moment(new Date(date)).format("MM/DD/YY  hh:mm:ss")

    const onHandleClick = (item) => {
     setjob(item)
    }

    return (
        <Row className='p-4'>
            <Row className='mb-4'>
                <Col className='p-0' md={3}>
                    <Select
                        className="basic-single"
                        classNamePrefix="select"
                        defaultValue={selectOptions[0]}
                        isClearable={true}
                        isSearchable={true}
                        onChange={(e) => setSelectedOption(e?.value ?? '')}
                        name="color"
                        options={selectOptions}
                    />
                </Col>
                <Col className='p-0 text-end'>Count: {count}</Col>
            </Row>
            <JobsTable columns={columns} data={filteredData} onClick={onHandleClick}/>
        </Row>
    )
}

export default Dashboard