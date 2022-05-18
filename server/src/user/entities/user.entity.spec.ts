import { UserEntity } from './user.entity';

describe('user class', () => {
  it('should make a user with no fields', () => {
    const user = new UserEntity();
    expect(user).toBeTruthy();
    expect(user.name).toBe('');
    expect(user.email).toBe('');
    expect(user.password).toBe('');
  });
  it('should make a user with name only', () => {
    const user = new UserEntity('test1');
    expect(user).toBeTruthy();
    expect(user.name).toBe('test1');
    expect(user.email).toBe('');
    expect(user.password).toBe('');
  });
  it('should make a user with name and email', () => {
    const user = new UserEntity('test1', 'test1@email.com');
    expect(user).toBeTruthy();
    expect(user.name).toBe('test1');
    expect(user.email).toBe('test1@email.com');
    expect(user.password).toBe('');
  });
  it('should make a user with name email and password', () => {
    const user = new UserEntity('test1', 'test1@email.com', 'test1Password');
    expect(user).toBeTruthy();
    expect(user.name).toBe('test1');
    expect(user.email).toBe('test1@email.com');
    expect(user.password).toBe('test1Password');
  });
});
