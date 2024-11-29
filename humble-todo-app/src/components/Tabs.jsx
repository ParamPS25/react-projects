export function Tabs(props){

    const tabs = ["All","Open","Completed"]
    const {selectedTab,setSelectedTab,todos} = props
    return(
        <nav className="tab-container">
            {/* if tab = "all" => display length of tasks irrespective of if it is complete or not 
                if tab = "open" => display only non completed tasks else display completed once */}
            { tabs.map((currentTab,tabIndex)=>{

                const numOfTasks = currentTab === "All" ? 
                        todos.length : currentTab === "Open" ? 
                            todos.filter((val) => !val.complete).length :
                            todos.filter((val) => val.complete).length
                return(
                    // dynamic className to add extra class to only selected tab
                    <button onClick={()=>{
                        setSelectedTab(currentTab)
                        }} key={tabIndex} className = {"tab-button " + 
                        (currentTab === selectedTab ? 'tab-selected' : ' ') }>                    
                        <h4>{currentTab} <span>{numOfTasks}</span></h4> 
                    </button>
                )
            }) }
            <hr />
        </nav>
    )
}