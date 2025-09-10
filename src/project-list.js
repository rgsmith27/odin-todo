import Project from "./project";

const ProjectList = (function() {
    let list = [];

    const addProject = (project) => {
        list.push(project);
    }

    const removeProject = (projectID) => {
        list = list.filter(item => item.id != projectID);
    };

    const getList = () => list;

    return{ getList, removeProject, addProject};
})();

export default ProjectList;