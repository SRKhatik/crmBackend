const {getAllUsers, updateUser} = require("../../Controllers/userController");
const { mockRequest, mockResponse } = require("../interceptor");
const User = require("../../Models/user");

const userTestPayload = {
    name:"shubham",
    password:"customer123",
    userStatus:"APPROVED",
    userTypes:"CUSTOMER",
    email:"shubham@google.com",
    userId:"srkhatik"
}

describe("Find all users",()=>{

    it("happy Case", async ()=>{

        let req= mockRequest();
        let res= mockResponse();

        const userSpy = jest.spyOn(User,'find').mockReturnValue(Promise.resolve([userTestPayload]));

        await getAllUsers(req,res);

        expect(userSpy).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith(
            expect.arrayContaining([
                expect.objectContaining({
                    email:"shubham@google.com",
                    userId:"srkhatik"
                })
            ])
        )
    })


})

const userUpdatePayload={
    status:"APPROVED"
}

const userTestPayoadForUpdate = {
    name:"shubham",
    password:"customer123",
    userStatus:"PENDING",
    userTypes:"CUSTOMER",
    email:"shubham@google.com",
    userId:"srkhatik",
    save:jest.fn()
}


const userTestPayoadForUpdatedValue = {
    name:"shubham",
    password:"customer123",
    userStatus:"APPROVED",
    userTypes:"CUSTOMER",
    email:"shubham@google.com",
    userId:"srkhatik",
    save:jest.fn()
}




describe("Update",()=>{    

    it("happy update Case", async ()=>{

        let req= mockRequest();
        let res= mockResponse();

        req.params = {id:1};
        req.body = userUpdatePayload; 

        jest.spyOn(userTestPayoadForUpdate, 'save').mockReturnValueOnce(Promise.resolve(userTestPayoadForUpdatedValue));

        const userSpy = jest.spyOn(User,'findOne').mockReturnValue(Promise.resolve(userTestPayoadForUpdate));
    
        await updateUser(req,res);

        expect(userSpy).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith(
            expect.objectContaining({
                userStatus:"APPROVED"
            })
        )

    })

})
