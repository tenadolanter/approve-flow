/**
 * 获取当前配置的所有节点配置列表
 * @param { Object } - nodeConfig 节点配置
 * @return { Array } - 节点列表
 */
export const getAllNodes = (nodeConfig) => {
  let result = [];
  result.push(nodeConfig);
  if (nodeConfig?.childNode) {
    const childs = getAllNodes(nodeConfig?.childNode);
    result.push(...childs);
  }
  if (nodeConfig?.conditionNodes && nodeConfig?.conditionNodes?.length) {
    nodeConfig?.conditionNodes.forEach((item) => {
      const childs = getAllNodes(item);
      result.push(...childs);
    });
  }
  return result;
};

/**
 * 获取当前配置的所有节点配置列表
 * @param { Object } - nodeConfig 节点配置
 * @param { String } - nodeId 节点id
 * @return { Array } - 节点列表
 */
export const getParentNode = (nodeConfig, nodeId, parent = null) => {
  let parentNode = null;
  if (nodeConfig.nodeId === nodeId) {
    parentNode = parent;
  }
  if (nodeConfig?.childNode) {
    const result = getParentNode(nodeConfig?.childNode, nodeId, nodeConfig);
    if (result) {
      parentNode = result;
    }
  }
  if (nodeConfig?.conditionNodes && nodeConfig?.conditionNodes?.length) {
    nodeConfig?.conditionNodes.forEach((item) => {
      const result = getParentNode(item, nodeId, nodeConfig);
      if (result) {
        parentNode = result;
      }
    });
  }
  return parentNode;
};

/**
 * 获取指定id的节点配置详情
 * @param { Array } - nodes 节点配置
 * @param { String } - nodeId 节点id
 * @return { Object } - 当前节点配置
 */
export const getCurrentNode = (nodes, nodeId) => {
  return nodes?.find((item) => item.nodeId === nodeId) ?? {};
};
