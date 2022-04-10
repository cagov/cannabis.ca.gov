const updateHistory = (props) => {
    let path = props.anchor + props.paramString;
    // window.history.pushState(props, props.title, path);
    window.location.href = path;
}

export {updateHistory};