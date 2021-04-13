import React, {Component} from 'react';
import Axios from 'axios';
import {Accordion,Card,Button} from 'react-bootstrap'

class StateData extends Component{
    constructor(){
        super()
        this.state={
            stateData:{}
        }
    }
    componentDidMount(){
        Axios.get("https://api.covid19india.org/state_district_wise.json")
        .then((response)=>{
             
            this.setState({stateData:response.data})
        })
        
        

    }
    
    render() {
        let keys=Object.keys(this.state.stateData)
        return (
            <div className="row">
                <div className="col-md-12">
                <Accordion defaultActiveKey="0">
                    {
                        keys.map((item,k)=>{
                            let districts=this.state.stateData[item].districtData
                            let district_keys=Object.keys(districts)

                            let total_active=0;
                            let total_confirmed=0;
                            let total_deaths=0;
                            let total_recover=0;

                            let district_list=[]
                            for(let x in districts){
                                total_active += districts[x].active
                                total_confirmed += districts[x].confirmed
                                total_deaths += districts[x].deceased
                                total_recover =+ districts[x].recovered
                                let ob=districts[x];
                                ob["district_name"] = x;
                                district_list.push(ob)
                            }
                            // console.log('District list',district_list[0])
                            return(
                                <Card>
                            <Card.Header>
                            <Accordion.Toggle as={Button} variant="info" eventKey={k}>
                                {item} <span className="text-dark font-weight-bold" >- Total Cases - {total_confirmed} - Active - {total_active} - Recover - {total_recover} - Deaths - {total_deaths}</span>
                            </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey={k}>
                            <Card.Body>
                                <table className="table table-bordered table-striped">
                                    <thead>
                                        <tr>
                                             <th>District</th>
                                             <th>Confirmed</th>
                                             <th>Active</th>
                                             <th>Recoverd</th>
                                            <th>Deaths</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            district_list.map((item,k)=>{
                                                
                                                return(
                                                    <tr>
                                                        <td>{item.district_name}</td>
                                                        <td>{item.confirmed}</td>
                                                        <td>{item.active}</td>
                                                        <td>{item.recovered}</td>
                                                        <td>{item.deceased}</td>
                                                        
                                                    </tr>

                                                )
                                            })
                                        }
                                        
                                    </tbody>
                                </table>
                            </Card.Body>
                            </Accordion.Collapse>
                            </Card>

                            )
                        })
                    }
                        
                        
                </Accordion>
                </div>
                
            </div>
        )
    }

}
export default StateData;