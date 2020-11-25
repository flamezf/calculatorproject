class CalculatorClass{
  constructor(previousoperandtextelement, currentoperandtextelement) {
      this.previousoperandtextelement=previousoperandtextelement
      this.currentoperandtextelement=currentoperandtextelement
      this.clear()
    
    }
   
  clear(){
    this.currentoperand='';
    this.previousoperand='';
    this.operation=undefined;
  }

  delete(){
     this.currentoperand=this.currentoperand.toString().slice(0,-1)
  }

  appendnumber(number){
      if(number=="." && this.currentoperand.includes(".")) return 
     this.currentoperand=this.currentoperand.toString() + number.toString()
  }
  chooseoperation(operation){
      if(this.currentoperand=='')return
      if(this.previousoperand!==''){
          this.compute()
      }
      this.operation=operation;
      this.previousoperand=this.currentoperand
      this.currentoperand=''
  }

  compute(){
    let computation = '';
    const prev=parseFloat(this.previousoperand)
    const current=parseFloat(this.currentoperand)
    
    if (isNaN(prev) || isNaN(current))return
    switch(this.operation) {
        case'+':
        computation=prev+current
        break
    case'-':
        computation=prev-current
        break
    case'*':
        computation=prev*current
        break
    case'/':
        computation=prev/current
        break
    default:
        return

    }
    console.log(computation)
    this.currentoperand=computation
    this.operation=undefined
    this.previousoperand=''
  }

  getdisplayNumber(number){
      const stringNumber=number.toString()
      const integerDigits=parseFloat(stringNumber.split('.')[0])
      const decimalDigits=stringNumber.split('.')[1]
      let integerDisplay;
      if(isNaN(integerDigits)){
          integerDisplay=''
      }else{
          integerDisplay=integerDigits.toLocaleString('en',{maximumFractionDigits: 0})
      }
      if(decimalDigits !=null) {
         return `${integerDisplay}.${decimalDigits}`
      }else{
          return integerDisplay
      }
  }

  updatedisplay(){
      this.currentoperandtextelement.innerText=
      this.getdisplayNumber(this.currentoperand)
      if(this.operation !=null){
        this.previousoperandtextelement.innerText=
        `${this. getdisplayNumber(this.previousoperand)} ${this.operation}`
      
    }
   }

}



const numberbuttons = document.querySelectorAll("[data-number]")
const operationbuttons = document.querySelectorAll("[data-operation]")
const equalsbutton = document.querySelector("[data-equals]")
const deletebutton = document.querySelector("[data-delete]")
const allclearbutton = document.querySelector("[data-all-clear]")
const previousoperandtextelement = document.querySelector("[data-previous-operand]")
const currentoperandtextelement = document.querySelector("[data-current-operand]")

let calculator=new CalculatorClass(previousoperandtextelement,currentoperandtextelement)

numberbuttons.forEach(button=>{
  button.addEventListener('click',()=>{
  calculator.appendnumber(button.innerText)
  calculator.updatedisplay()
  })  
})

operationbuttons.forEach(button=>{
    button.addEventListener('click',()=>{
    calculator.chooseoperation(button.innerText)
    calculator.updatedisplay()
    })  
  })

  equalsbutton.addEventListener('click',button=>{
      calculator.compute()
      calculator.updatedisplay();
  })
  allclearbutton.addEventListener('click',button=>{
    calculator.clear()
    calculator.updatedisplay()
  })
  deletebutton.addEventListener('click',button=>{
    calculator.delete()
    calculator.updatedisplay()
  })