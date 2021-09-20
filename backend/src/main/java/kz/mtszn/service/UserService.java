package kz.mtszn.service;

import kz.mtszn.dto.UserDto;

public interface UserService {
    UserDto findUserByName(String username);
}
