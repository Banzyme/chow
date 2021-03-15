# Azure Serverless functions


## Azure Cosmos DB Binding Basics

i. Input binding examples

* Retrive documents using via the SQL API
```cs

[FunctionName("DocsBySqlQuery")]
public static IActionResult Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", "post", Route = null)]
                HttpRequest req,
            [CosmosDB(
                databaseName: "ToDoItems",
                collectionName: "Items",
                ConnectionStringSetting = "CosmosDBConnection",
                SqlQuery = "SELECT top 2 * FROM order")] IEnumerable<ToDoItem toDoItems,
                ILogger log)
        {
            log.LogInformation($"Retrived {todoItems.ToList().Count} todo items:");
            foreach (ToDoItem toDoItem in toDoItems)
            {
                log.LogInformation(toDoItem.Description);
            }
            return new OkResult();
        }
    }
```


ii. Output binding


