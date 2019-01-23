Create Procedure SaveClientInfo
@ClientInfo nvarchar

as
Begin

Insert into ClientInfo values(@ClientInfo)

end