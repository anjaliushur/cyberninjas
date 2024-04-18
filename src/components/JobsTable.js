import React from 'react'
import {Table,Button} from 'react-bootstrap';
import {Link} from 'react-router-dom'
import './component.css'

const JobsTable = ({columns,data,onClick}) => {
   return (
    <Table striped>
    <thead>
      <tr>
        {columns.map((item) => {
            return <th>{item.label}</th>
        })}
        <th></th>
      </tr>
    </thead>
    <tbody>
      {data.map((item)=> {
       return(
         <tr onClick={() => onClick(item)} style={{cursor:'pointer'}}>
            {columns.map((column)=> {
                return <td>{item[column.field]}</td>
            })}
            <td><Button className='viewButton'>
                <Link to='/details'>View Detail</Link></Button></td>
        </tr>
        )
      })}
    </tbody>
  </Table>
   )
}

export default JobsTable