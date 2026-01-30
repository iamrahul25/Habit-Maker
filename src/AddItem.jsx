import { useRef, useState } from 'react';
import { useTodoContext } from './context';

const AddItem = () => {

    const {setDisplayAddItem, TodosList, setTodosList } = useTodoContext();

    const [color, setColor] = useState(0);
    const [logo, setLogo] = useState("fa-solid fa-clipboard-list");

    const formRef = useRef(null);

    const handleSubmit = (e)=>{

        e.preventDefault();

        // const logoname = formRef.current.logo.value;
        const logoclass = logo;
        
        const title = formRef.current.title.value.trim();
        const color = formRef.current.color.value;

        const form = {logoclass,title,color};
        
        // console.log("Form Value: ", form);

        //Check if the item is already present in the array or not.
        const present = TodosList.find(item => item.title === title);

        if(present){
            alert("Item is already present in the list.");
        }
        else{
            setTodosList([...TodosList, form]);
        }
        
        // console.log("TodosList: ", TodosList);

        //Reset the form---------------
        formRef.current.reset();
        setDisplayAddItem(false);
    }

    const changeLogo = (e)=>{

        const logo = e.target.value;

        if(logo.trim() === ""){
            setLogo("fa-solid fa-clipboard-list");
        }
        else{
            const logoclass = logo.split('"')[1];
            setLogo(logoclass);
        }
    }

    return (
  
        <div className="add_item">

            <div className="logo_div">
                <span className="icons"> <i style={{color: `hsl(${color}, 75%, 50%)`, backgroundColor: `hsl(${color}, 75%, 93%)`}} className={logo}></i> </span>
            </div>

            <form onSubmit={handleSubmit} ref={formRef} className="form">


                <table style={{width: '100%'}}>

                    <tbody>

                        <tr>
                            <td style={{width: '70px'}}> <label htmlFor="logo">Logo: </label> </td>
                            <td> <input className="input_field" onChange={changeLogo} type="text" name="logo" placeholder="eg:  <i class='fa-solid fa-person'></i>"/> </td>
                        </tr>

                        <tr>
                            <td> <label htmlFor="title">Title :</label> </td>
                            <td> <input className="input_field" type="text" name="title" placeholder="eg:  Running" required/> </td>
                        </tr>

                        <tr>
                            <td> <label htmlFor="color">Color: </label></td>
                            <td> <input className="color_slider" onChange={(e)=>{setColor(e.target.value)}} defaultValue="0" type="range" name="color" min="1" max="360"/> </td>
                        </tr>


                        <tr>
                            <td> <label htmlFor="color">Icons: </label> </td>
                            <td> <a className='icon_link' rel="noreferrer" href="https://fontawesome.com/search?m=free" target="_blank">Get Icons! Click here...  🏃‍♂️</a> </td>
                        </tr>
          
                    </tbody>

                </table>

                <div className="button_div">
                    <button className="button1" type="submit">Save Item</button>
                    <button className="button2" type="button" onClick={()=>{setDisplayAddItem(false)}}>Cancel</button>
                </div>

            </form>
            
        </div>
    )
}

export default AddItem;