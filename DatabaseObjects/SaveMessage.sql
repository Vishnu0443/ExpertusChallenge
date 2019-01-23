Create procedure SaveMessage
@FirstName nvarchar,
@LastName nvarchar,
@Email nvarchar,
@Message nvarchar

as
Begin

Insert into Message values(@FirstName, @LastName, @Email, @Message)
End