export function appReducer(state = {}, action) {
    switch (action.type) {
        case 'INITIAL_PROJECTS':
            return {
                ...state,
                projects: [...action.payload],
                activeProject: action.payload.filter(project => project.active === true)[0]
            }
    
        default:
            return state
    }
}