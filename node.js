const Node = (data, left = null, right = null) => {
  return {
    data,
    left: left,
    right: right,
  };
};

export default Node;
