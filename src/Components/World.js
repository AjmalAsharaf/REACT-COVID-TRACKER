import React, {Component} from 'react';
import Axios from 'axios';

class World extends Component{
    constructor(){
        super()
        this.state={
                data:[]
        }
    }
    componentDidMount(){
        Axios.get('https://corona.lmao.ninja/v2/countries')
        .then((response)=>{
            this.setState({data:response.data})
            console.log(response.data)
        })
    }
    render() {
        return (
            <div className="row">
                <div className="col-md-12">
                    <table className="table table-primary table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>Country</th>
                                <th>Total Cases</th>
                                <th>Recovered</th>
                                <th>Death</th>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.data.map((item,k)=>{
                                    return(
                                        <tr>
                                        <td>{item.country}
                                        <img style={ {width:'64px' ,marginLeft:'10px'}} src={item.countryInfo.flag} />
                                        </td>
                                        <td>{item.cases}</td>
                                        <td>{item.recovered}</td>
                                        <td>{item.deaths}</td>
                                        </tr>
                                    )
                                    
                                })
                            }
                            
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }

}
export default World;