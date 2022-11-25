import { useState } from "react"
import { Button, Container, Form, Table } from "react-bootstrap";
import { evaluate } from 'mathjs'
import 'chart.js/auto'
import { Line } from "react-chartjs-2";

const Secant =()=>{
    const print = () =>{
        console.log(data)
        setValueIter(data.map((x)=>x.iteration));
        setValueX0(data.map((x)=>x.X0));
        setValueX1(data.map((x)=>x.X1));;
        return(
            <Container>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th width="10%">Iteration</th>
                            <th width="30%">X0</th>
                            <th width="30%">X1</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((element, index)=>{
                            return  (
                            <tr key={index}>
                                <td>{element.iteration}</td>
                                <td>{element.X0}</td>
                                <td>{element.X1}</td>
                            </tr>)
                        })}
                    </tbody>
                </Table>
            </Container>
           
        );
    }

    const error =(xold, xnew)=> Math.abs((xnew-xold)/xnew)*100;
   
    const CalSecant = (x0, x1) => {
        var x2,fx0,fx1,ea,scope;
        var iter = 0;
        var MAX = 50;
        const e = 0.00001;
        var obj={};
        do
        {
            scope = {
                x:x0,
            }
            fx0 = evaluate(Equation, scope)

            scope = {
                x:x1,
            }
            fx1 = evaluate(Equation, scope)
            x2 = (x1-fx1*(x0-x1)/(fx0-fx1))
            x0 = x1;
            x1 =x2;
            iter ++;
            ea = error(x0, x1);
                obj = {
                    iteration:iter,
                    X0:x0,
                    X1:x1,
                }
                data.push(obj)
        }while(ea>e && iter<MAX)
        setX(x2)
    }

    const data =[];
    const [valueIter, setValueIter] = useState([]);
    const [valueX0, setValueX1] = useState([]);
    const [valueX1, setValueX0] = useState([]);
    const state = {
        labels: valueIter,
        datasets: [
          {
            label: 'x0',
            fill: false,
            lineTension: 0.5,
            backgroundColor: 'white',
            borderColor: 'red',
            borderWidth: 2,
            data: valueX0
          },
          {
            label: 'x1',
            fill: false,
            lineTension: 0.5,
            backgroundColor: 'white',
            borderColor: 'blue',
            borderWidth: 2,
            data: valueX1
          },
        ]
    }
   
   
    //const [Data,setData] = useState([])
    const [html, setHtml] = useState(null);
    const [Equation,setEquation] = useState("(x^4)-13")
    const [x,setX] = useState(0);
    const [x0,setX0] = useState(0)
    const [x1,setX1] = useState(0)
    const [show,setShow] = useState(false);

    const inputEquation = (event) =>{
        console.log(event.target.value)
        setEquation(event.target.value)
    }

    const inputX0 = (event) =>{
        console.log(event.target.value)
        setX0(event.target.value)
    }

    const inputX1 = (event) =>{
        console.log(event.target.value)
        setX1(event.target.value)
    }

    const calculateRoot = () =>{
        const X1 = parseFloat(x0)
        const X2 = parseFloat(x1)
        CalSecant(X1,X2);
        setShow(true);
        setHtml(print());
       
        //setState();
        console.log(valueIter)
    }

    return (
            <Container>
                <Form >
                    <h3>Secant</h3>
                    <Form.Group className="mb-3">
                    <Form.Label>Input f(x)</Form.Label>
                        <input type="text" id="equation" value={Equation} onChange={inputEquation} style={{width:"20%", margin:"0 auto"}} className="form-control"></input>
                        <Form.Label>Input X0</Form.Label>
                        <input type="number" id="XL" onChange={inputX0} style={{width:"20%", margin:"0 auto"}} className="form-control"></input>
                        <Form.Label>Input X1</Form.Label>
                        <input type="number" id="XL" onChange={inputX1} style={{width:"20%", margin:"0 auto"}} className="form-control"></input>
                    </Form.Group>
                    <Button variant="dark" onClick={calculateRoot}>
                        Calculate
                    </Button>
                </Form>
                <br></br>
                {show&&<h5>Answer = {x.toPrecision(7)}</h5>}
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

export default Secant;