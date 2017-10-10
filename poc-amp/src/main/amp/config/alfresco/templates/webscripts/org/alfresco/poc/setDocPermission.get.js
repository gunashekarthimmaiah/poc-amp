function main()
{
   parentNodeRef = search.findNode(args.nodeRef);
   var query = "PARENT:\"" + parentNodeRef.nodeRef + "\" AND TYPE:\"cm:content\"";
   var results = search.luceneSearch(query, "@cm:modified", false);
   model.sowDoc = results[0];
}
main();