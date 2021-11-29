// AppReducer
export const appReducerAppReady = 'APP_READY' // tells the app to boot up
export const appReducerGetLang = 'GET_LANGUAGES' // Loads languages into state
export const appReducerInitialProjects = 'INITIAL_PROJECTS' // Loads initial projects into state and activates the last used project (given from action)
export const appReducerSwitchProject = 'SWITCH_PROJECT' // one part of clcik event deactivates all other projects and then activates the one which was clicked on 
export const appReducerQuerySnippet = 'QUERY_SNIPPET' // saves the typed query into the state to update the input  
export const appReducerOpenQueryView = 'OPEN_QUERY_VIEW' // open the query view (when clicked or query with /g was typed), deactivates all projects
export const appReducerResetQuery = 'RESET_QUERY' // deletes the query from the state
export const openSnippsterMarket = 'OPEN_SNIPPSTER_MARKET'
// Experimental
export const appReducerAddProjectMain = 'addProjectMain' // first attemp to communicate from another page with my react redux state


// SnippetsReducer
export const snippetsReducerInitialSnippets = 'INITIAL' // Loads initial snippets into state and activates the first one 


export const snippetsReducerActivate = 'ACTIVATE' // handles the click event of a snippet - deactivates all and the activates the one which was clicked

//save
export const snippetsReducerUpdate = 'UPDATE' // sets the isSaved variable of a snippet to true again

// Edits
export const snippetsReducerEditTitle = 'EDIT_TITLE' // Edits the title of the currently activeSnippet
export const snippetsReducerEditDescription = 'EDIT_DESCRIPTION' // Edits the description of the currently activeSnippet
export const snippetsReducerEditCode = 'EDIT_CODE' // Edits the Code of the currently activeSnippet
export const snippetsReducerEditLanguage = 'EDIT_LANGUAGE' // Edits the Code of the currently activeSnippet
export const snippetsReducerEditFramework = 'EDIT_FRAMEWORK' // Edits the Code of the currently activeSnippet
//Add and delete
export const snippetsReducerAddSnippet = 'ADD_SNIPPET' // Adds an empty snippet to the list and activates it
export const snippetsReducerDeleteSnippet = 'DELETE_SNIPPET' // Adds an empty snippet to the list and activates it
// Open another project
export const snippetsReducerProjectSwitch = 'SWITCH_PROJECT_SNIPPETS' // loads the snippet of the newly activated project into the state and activates the first one (determined by the action)

// query methodes
// open view by clicking
export const snippetsReducerActivateSnippetQueriedState = 'ACTIVATE_IN_QUERIED_STATE' // loads the queriedSnippets into the state and activates the first of them


export const snippetsReducerQueryProject = 'QUERY_SNIPPET_IN_PROJECT' // queriedSnippet is equal snippets the query view is not opened
export const snippetsReducerQueryGlobal = 'QUERY_SNIPPET_GLOBAL' // queriedSnippet is updated - snippets stays untouched
