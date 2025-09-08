import Project from "./project";

export default projectList = (function() {
    const list = [];

    const addProject = (item) => list.push(item);

    const removeProject = (projectID) => list = list.filter(item => item.id != projectID);

    return{ list, addProject, removeProject};
})();