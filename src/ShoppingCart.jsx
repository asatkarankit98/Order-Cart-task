import React,{useEffect,useState} from 'react';
import axios from 'axios';

const ShoppingCart = () => {
    let [dataList, setDataList]=useState([]);
    let [updateList, setUpdateList]=useState(false);
    function lessQut(val){
        let newData = JSON.parse(JSON.stringify(dataList)) 
           
        newData.map((value)=>{
            if (value.id === val) {
                
                value.price.formatted=value.price.formatted/value.quantity 
                value.quantity--
                value.price.formatted=value.price.formatted*value.quantity 
            }
        })
        setDataList(newData);
    }
    function addQut(val) {
        // alert("++")
         let newData = JSON.parse(JSON.stringify(dataList)) 
           
        newData.map((value)=>{
            if (value.id === val) {
                
                value.price.formatted=value.price.formatted/value.quantity 
                value.quantity++
                value.price.formatted=value.price.formatted*value.quantity 
            }
        })
        setDataList(newData);


    }
    function getTotals(){
        let newData = JSON.parse(JSON.stringify(dataList)) 
           
      let cost = 0
        newData.map((value)=>{
                
               
             cost = cost+  parseFloat( value.price.formatted)
            
        })
       return cost
    }
    function orderNow(){
        alert("Thank You !")
    }
    function getData(){
        if (!updateList) {
            console.log("API clled")
            const url = "https://api.chec.io/v1/products?limit=25"
        axios({
            method: 'get',
            url: url,
            headers:{
                "X-Authorization" : "pk_4385257974c9e9062c8c71e284f5362186157d0f113fb"
            }
        })
        .then(response => response.data)
        .then((data)=>{
            console.log(data)
            let newData = data.data
            newData.map((d)=>{
                d.quantity = 1
            })
            setDataList(newData);
            setUpdateList(true)
        })
        }
        
    }
    
    useEffect(() => {
        getData()
    },[dataList]);
    return (
        <div>
  <div className="h-100" style={{backgroundColor: '#eee'}}>
    <div className="container h-100 py-5">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-10">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h3 className="fw-normal mb-0 text-black">Shopping Cart</h3>
            <div>
              <p className="mb-0"><span className="text-muted">Sort by:</span> <a href="#!" className="text-body">price <i className="fas fa-angle-down mt-1" /></a></p>
            </div>
          </div>
          {dataList.map((n)=>
            <div className="card rounded-3 mb-4">
            <div className="card-body p-4">
              <div className="row d-flex justify-content-between align-items-center">
                <div className="col-md-2 col-lg-2 col-xl-2">
                  <img src={n.image.url} className="img-fluid rounded-3" alt="Cotton T-shirt" />
                </div>
                <div className="col-md-3 col-lg-3 col-xl-3">
                  <p className="lead fw-normal mb-2">{n.name}</p>
                  <p><span className="text-muted">Price: </span><span className="text-muted">{n.price.formatted_with_code}</span></p>
                </div>
                <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
                    {n.quantity === 1 ?
                    <button className="btn btn-danger" disabled > - </button>:
                    <button className="btn btn-success" onClick={()=> lessQut(n.id)}> - </button>
                }
                  <input Value={n.quantity} type="number" className="form-control form-control-sm mx-2"/>
                  <button className="btn btn-success" onClick={()=> addQut(n.id)}> + </button>
                </div>
                <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                  <h5 className="mb-0">{n.price.formatted}</h5>
                </div>
              </div>
            </div>
          </div>
          )}        
          <div className="card mb-4">
            <div className="card-body p-4 d-flex flex-row">
              <div className="form-outline flex-fill">
                <input type="text" value={getTotals()} className="form-control form-control-lg" />
                <label className="form-label" htmlFor="form1">Total Price</label>
              </div>
              <button type="button" className="btn btn-outline-warning btn-lg ms-3">View</button>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <button type="button" onClick={orderNow} className="btn btn-warning btn-block btn-lg">Proceed to Pay</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

    );
}

export default ShoppingCart;
