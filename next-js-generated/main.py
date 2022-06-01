import sys
import mysql.connector


mydb = mysql.connector.connect(
    host="localhost",
    user="root",
    password="root",
    database="click-univers"
)
mycursor = mydb.cursor()

args = sys.argv
if(len(args) == 3):
    actions = args[1].split(":")
    if actions[0] == "generate":
        if actions[1] == "ts-type":
            tableName = args[2].lower()
            typeName = args[2]
            tryNumber = 0
            while 1:

                try:
                    mycursor.execute("DESCRIBE "+tableName)

                    break
                except:
                    if(tryNumber > 0):
                        break
                    tableName = tableName+"s"
                    tryNumber = tryNumber+1
            types = """import { PaginatorInfo, Scalars, SortOrder } from "./generated";"""+"\n"
            table = []
            for x in mycursor:
                attribut = x[0]
                t = x[1]
                if(t.startswith(("bigint", "int"))):
                    t = "Scalars[\"Int\"]"
                elif(t.startswith(("var", "text"))):
                    t = "Scalars[\"String\"]"
                elif(t.startswith(("double", "float"))):
                    t = "Scalars[\"Float\"]"
                elif(t.startswith(("timestamp"))):
                    t = "Scalars[\"DateTime\"]"

                table.append([attribut, t])
            # create type table
            types = types+"export type "+typeName+" = { \n"
            for x in table:
                types = types+x[0]+": "+x[1]+";\n"
            types = types+"}\n"
            # create type create
            types = types+"export type Create"+typeName+" = { \n"
            for x in table:
                if(x[0].startswith(("id", 'created_at', "updated_at")) == False):
                    types = types+x[0]+": "+x[1]+";\n"
            types = types+"}\n"

            # update type create
            types = types+"export type Update"+typeName+" = { \n"
            for x in table:
                if(x[0].startswith(("id", 'created_at', "updated_at")) == False):
                    types = types+x[0]+": "+x[1]+";\n"
            types = types+"}\n"

            # update type create
            types = types+" export type "+typeName+"""QueryOptionsType = {
type?: string;
  text?: string;
  page?: number;
  parent?: number | null;
  limit?: number;
  orderBy?: string;
  sortedBy?: SortOrder;
};
           """
            # update type create
            types = types+" export type "+typeName+"""Paginator = {
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
  /** A list of Order; items. */
  data: Array<"""+typeName+">;};"


            f = open(tableName+"-type.ts", "w")
            f.write(types)
            f.close()

else:
    print("commande error")
