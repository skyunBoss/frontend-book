// interface 和 type 区别
// type 可以声明基本类型别名，联合类型，元组等类型
// 基本类型：type Name = string;
// 联合类型：type Pet = Dog | Cat;
// 元组类型：type PetList = [Dog, Cat];
// type 语句中还可以使用 typeof 获取实例的 类型进行赋值
// interface 能够声明合并

// ts中const和readonly的区别
// const可以防止变量的值被修改
// readonly可以防止变量的属性值被修改

// enum常规枚举和常量枚举的区别
// 常量枚举在编译以后不会产生一个枚举对象

// void定义的变量类型
// void没有任何类型

// ts编译原理
// 对于源代码，TS首先对它进行词法分析，通过scanner进行逐词扫描，生成token流
// 对于scanner生成的token，parser会对其进行组装并生成一棵AST
// binder会生成symbol（符号），并为AST上的每一个节点绑上相应的symbol
// checker检查处理后的AST，利用其进行语法检查
// emitter根据最终的AST生成JS代码和声明文件（d.ts）