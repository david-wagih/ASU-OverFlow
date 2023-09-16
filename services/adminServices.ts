import axios from "../utils/axios";

const getAllUsersRequests = async () => {
  const requests = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/api/User/requests`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
  const allRequestsJson = requests ? await requests.json() : null;
  return allRequestsJson;
};

const getAllUsers = async () => {
  const users = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/api/User/allUsers`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
  const allUsersJson = users ? await users.json() : null;
  return allUsersJson;
};

const updateUserRequest = async (
  id: number,
  status: string,
  email?: string
) => {
  if (id && status) {
    if (status === "accepted") {
      const acceptrequest = await axios({
        url: "user/requests",
        method: "PUT",
        data: {
          id: id,
          status: status
        }
      });
      await updateUserPrivilege(email!);
    } else if (status === "rejected") {
      const rejectrequest = await axios({
        url: "user/requests",
        method: "PUT",
        data: {
          id: id,
          status: status
        }
      });
      return rejectrequest;
    }
  } else {
    return "requires id and status";
  }
};

const updateUserPrivilege = async (email: string) => {
  const updatedUser = await axios({
    url: `user/${email}`,
    method: "PUT",
    data: {
      hasPrivilege: true
    }
  });
  return updatedUser;
};

const updateUserAccess = async (email: string, isRestricted: Boolean) => {
  const updatedUser = await axios({
    url: "admin",
    method: "PUT",
    data: {
      userEmail: email,
      isRestricted: isRestricted
    }
  });
  return updatedUser;
};
export {
  getAllUsersRequests,
  getAllUsers,
  updateUserRequest,
  updateUserAccess
};
