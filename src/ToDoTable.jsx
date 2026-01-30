import { useTodoContext } from './context';

const ToDoTable = () => {

    const {TodosList, TodosTable, getCurrentDate, userSettings, setUserSettings, reverseTable, handleCheck} = useTodoContext();

    const changeSettings = (name) =>{
        setUserSettings({...userSettings, [name]: !userSettings[name]});
    }
    
    return (

        <div className="table">

            <div className="heading_div">
                <h1>To-Do Table</h1>
            </div>

            <table  className={userSettings.showBorder ? 'show_border' : ''}>

                <thead  className={userSettings.showTitles ? '' : 'hide_title'}>

                    <tr>
                        
                        <th>
                            <span className="icons"><i className="fa-solid fa-calendar-days"></i></span>
                            <p>Date</p>
                        </th>

                        {/* Logo from Todo's List Mapping------------------- */}

                        {TodosList.map((item, index) => {
                            return (
                                <th key={index}>
                                    <span className="icons"><i className={item.logoclass} style={{color: `hsl(${item.color}, 75%, 50%)`, backgroundColor: `hsl(${item.color}, 75%, 93%)`}}> </i></span>
                                    <p>{item.title}</p>
                                </th>
                            )
                        })}
                        
                        <th>
                            <span className="icons"><i className="fa-solid fa-clipboard-check"></i></span>
                            <p>Total Completed</p>
                        </th>

                    </tr>

                </thead>


                <tbody>

                    {(userSettings.reverse ? Object.keys(TodosTable).sort().reverse() : Object.keys(TodosTable).sort()).map((date,index)=>{

                        // console.log("Key: index: ",date,index);
                        // console.log("Value::: ",Table[date]);

                        return (

                            <tr key={index}>

                                <td>{date}</td>

                                {TodosList.map((item, index)=>{
                                // console.log("Item : Index: ",item,index);

                                const check = TodosTable[date].includes(item.title);
                                
                                if(getCurrentDate() !== date){
                                    if (check) { return <td key={index}> <i className="fa-solid fa-square-check done"></i> </td> }
                                    else { return <td key={index}> <i className="fa-solid fa-square-xmark notdone"></i> </td> }
                                }

                                else{
                                    return <td key={index}> <input type="checkbox" onClick={handleCheck} name={date + '-' + item.title} defaultChecked={check}/></td>
                                }

                                })}

                                <td>{TodosTable[date].length} / {TodosList.length}</td>

                            </tr>
                        )

                    })}


                </tbody>

            </table>

            <div className="table_setting">
                <div>
                    <input type="checkbox" onClick={()=>{changeSettings('showBorder')}} defaultChecked={userSettings.showBorder} name="show_border"/>
                    <label> Show Border</label>
                </div>

                <div>  
                    <input type="checkbox" onClick={()=>{changeSettings('showTitles')}} defaultChecked={userSettings.showTitles} name="show_titles"/>
                    <label> Show Titles</label>
                </div>

                <div>  
                    <input type="checkbox" onClick={()=>{changeSettings('reverse'); reverseTable();}} defaultChecked={userSettings.reverse} name="reverse"/>
                    <label> Reverse</label>
                </div>
            </div>

        </div>
    )
}

export default ToDoTable