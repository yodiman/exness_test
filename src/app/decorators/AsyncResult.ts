export default function AsyncResult(_target, _propertyKey, descriptor) {
  const oldValue = descriptor.value;

  function setResult(...args) {
    const result = oldValue.apply(this, args); // tslint:disable-line
    return __CLIENT__ ? null : result;
  }

  descriptor.value = setResult;

  return descriptor;
}
