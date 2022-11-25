import { useState } from "react"
import { Button, Container, Form, Table } from "react-bootstrap";
import { derivative , evaluate } from 'mathjs'
import 'chart.js/auto'
import { Line } from "react-chartjs-2";

const NewtonRaphson =()=>{
    const print = () =>{
        console.log(data)
        setValueIter(data.map((x)=>x.iteration));
        setValueXi(data.map((x)=>x.Xi));
        return(
            <Container>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th width="10%">Iteration</th>
                            <th width="30%">X</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((element, index)=>{
                            return  (
                            <tr key={index}>
                                <td>{element.iteration}</td>
                                <td>{element.Xi}</td>

                            </tr>)
                        })}
                    </tbody>
                </Table>
            </Container>
           
        );
    }

    const error =(xold, xnew)=> Math.abs((xnew-xold)/xnew)*100;
   
    const CalNewtonRaphson = (x) => {
        var ea,scope,xold;
        var iter = 0;
        var MAX = 50;
        const e = 0.00001;
        var obj={};
        do
        {
            scope = {
                x:x
            }

            xold = x
            x = x - evaluate(Equation,scope)/derivative(Equation,'x').evaluate({x:x})

            iter ++;
            ea = error(xold,x)

              obj = {
                    iteration:iter,
                    Xi:x,
                }
                data.push(obj)

        }while(ea>e && iter<MAX)
        setX(x)
    }

    const data =[];
    const [valueIter, setValueIter] = useState([]);
    const [valueXi, setValueXi] = useState([]);
    const state = {
        labels: valueIter,
        datasets: [
          {
            label: 'X',
            fill: false,
            lineTension: 0.5,
            backgroundColor: 'white',
            borderColor: 'red',
            borderWidth: 2,
            data: valueXi
          },
        ]
    }
   
   
    //const [Data,setData] = useState([])
    const [html, setHtml] = useState(null);
    const [Equation,setEquation] = useState("(x^2)-7")
    const [X,setX] = useState(0)
    const [Xi,setXi] = useState(0)
    const [show,setShow] = useState(false);

    const inputEquation = (event) =>{
        console.log(event.target.value)
        setEquation(event.target.value)
    }

    const inputXi = (event) =>{
        console.log(event.target.value)
        setXi(event.target.value)
    }

    const calculateRoot = () =>{
        const xnum = parseFloat(Xi)
        CalNewtonRaphson(xnum);
        setShow(true);
        setHtml(print());
       
        //setState();
        console.log(valueIter)
    }

    return (
            <Container>
                <Form >
                    <h3>Newton</h3>
                    <Form.Group className="mb-3">
                    <Form.Label>Input f(x)</Form.Label>
                        <input type="text" id="equation" value={Equation} onChange={inputEquation} style={{width:"20%", margin:"0 auto"}} className="form-control"></input>
                        <Form.Label>Input X</Form.Label>
                        <input type="number" id="XL" onChange={inputXi} style={{width:"20%", margin:"0 auto"}} className="form-control"></input>
                    </Form.Group>
                    <Button variant="dark" onClick={calculateRoot}>
                        Calculate
                    </Button>
                </Form>
                <br></br>
                {show&&<h5>Answer = {X.toPrecision(7)}</h5>}
                {show&&<Container>
                {html}
                <Line
                data={state}
                options={{
                title:{
                    display:true,
                    text:'False Position Method',
                    fontSize:20
                    },
                legend:{
                display:true,
                position:'right'
                }
                }}
                />
                </Container>}
               
            </Container>
           
    )
}

export default NewtonRaphson;