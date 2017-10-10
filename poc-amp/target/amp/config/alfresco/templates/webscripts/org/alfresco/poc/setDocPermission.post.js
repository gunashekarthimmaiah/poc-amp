function main()
{
	var nodeRef = args.nodeRef;
    var userID = args.userID;
    var node = search.findNode(nodeRef);
    node.setPermission("Read", userID);
   model.result = "The user"+userID + "has granted with read permission on" + nodeRef;
}
main();