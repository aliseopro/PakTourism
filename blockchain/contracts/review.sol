
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
pragma experimental ABIEncoderV2;
// Base contract REVIEW
contract Review {
    struct Package {
        string packageName;
        uint packagePrice;
        string packageHash;
        uint avgRating;
        uint totalReviewed;
        address[] users;
    }
    struct UserInput {
        uint rating;
        string comments;
        uint dateOfReview;
        bool IspackageReviewedByUser;
    }
    
    Package Newpackage;
    UserInput newInput;
    uint public Totalpackages;
    
    mapping(uint => Package) packageDetails;
    uint[]    public packageIds;
    mapping(uint => mapping (address => UserInput)) userReview;
   
    event addpackageEvent( uint pid, string pname );
    event reviewpackageEvent( uint pid, uint avgRating );
    
    constructor() {
        Totalpackages = 0;
    }
    
    function addpackage(string memory pname, uint price, string memory imagehash) public {
        require(keccak256(bytes(pname)) != keccak256(""), "package Name required !");

         Totalpackages++;
         uint pid = Totalpackages + 111110;
        
        Newpackage.packageName = pname;
        Newpackage.packagePrice = price;
        Newpackage.packageHash = imagehash;
        Newpackage.avgRating = 0;
        Newpackage.totalReviewed = 0;
        Newpackage.users.push(msg.sender);

        packageIds.push(pid);
        packageDetails[pid] = Newpackage;
        
        emit addpackageEvent(Totalpackages, pname);
    }
     function getTotalpackages() public view returns(uint) {
        return Totalpackages;
    }
    
    function getpackage(uint pid) public view returns (Package memory) {
        return packageDetails[pid];
    }
     
    
    function reviewpackage(uint packageId, uint urating, string memory ucomments, uint reviewDate) public {
        require(packageId >= 0, "packageid required !");
        require(urating > 0 && urating <= 5, "package rating should be in 1-5 range !");
        require(userReview[packageId][msg.sender].IspackageReviewedByUser == false, "package already reviewed by user !");
        
        Package storage oldpackage = packageDetails[packageId];
        oldpackage.avgRating += urating * 10;
        oldpackage.totalReviewed++;
        oldpackage.users.push(msg.sender);

        newInput.rating = urating;
        newInput.comments = ucomments;
        newInput.dateOfReview = reviewDate;
        newInput.IspackageReviewedByUser = true;
        
        userReview[packageId][msg.sender] = newInput;
        
        
        emit reviewpackageEvent(packageId, urating);
    }
    
    
    function getpackageAvgRating(uint pid) public view returns (string memory pname, uint avgRating) {
        require(pid >= 0, "packageid required !");
        
        uint allAvgRating = 0;

        if(packageDetails[pid].totalReviewed > 0)
            allAvgRating = packageDetails[pid].avgRating / packageDetails[pid].totalReviewed;
        
        return (packageDetails[pid].packageName, allAvgRating);
    }
    
    function getCurrentUserComments(uint pid) public view returns (string memory ucomments) {
         require(pid >= 0, "packageid required !");
         
         return userReview[pid][msg.sender].comments;
         
    }
    
    function getCurrentUserRating(uint pid) public view returns (uint urating) {
         require(pid >= 0, "packageid required !");
         
         return userReview[pid][msg.sender].rating;
         
    }
    
    function getUserComments(uint pid, address user) public view returns (string memory ucomments) {
         require(pid >= 0, "packageid required !");
         
         return userReview[pid][user].comments;
         
    }
    
    function getUserRating(uint pid, address user) public view returns (uint urating) {
         require(pid >= 0, "packageid required !");
         
         return userReview[pid][user].rating;
         
    }
    
    function getUserDateOfReview(uint pid, address user) public view returns (uint reviewDate) {
         require(pid >= 0, "packageid required !");
         
         return userReview[pid][user].dateOfReview;
         
    }
    
    function getAllpackagePids() public view returns (uint[] memory) {
        return packageIds;
    }

    function getAllUsersForpackage(uint pid) public view returns  (address[] memory){
       return packageDetails[pid].users;
    }

}

