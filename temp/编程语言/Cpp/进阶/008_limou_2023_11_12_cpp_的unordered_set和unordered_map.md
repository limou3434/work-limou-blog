---
title: 008_limou_2023_11_12_cpp_的unordered_set和unordered_map
createTime: 2025/04/09 13:05:16
permalink: /article/f1s75gqx/
---
# 1.哈希概念

哈希是一种算法思想，不是某一种具体的算法，只要将输入值 $x$ 通过某种哈希思想 $f$ 得到唯一对应的 $f(x)$，这种映射关系就是哈希思想。

而在 `C++` 中，关于哈希的容器主要体现在 `unordered_set` 和 `unordered_map` 容器中，这两个容器和 `set` 和 `map` 的使用从表面上来看几乎没有区别。

但是 `set` 和 `map` 都会对数据进行排序，而 `unordered_set` 和 `unordered_map` 则只是单纯的去重，不会进行排序。

并且两种容器在某些程度上，不排序的 `unordered_set` 和 `unordered_map` 在效率上会更胜一筹（尤其是在查找的时候）。

# 2.哈希思路

## 2.1.直接定址法

取关键字的某个线性函数作哈希地址：$Hash(key) = A*key + B$。优点是简单、均匀，缺点是需要事先知道数据的分布情况，只适合查找比较小且连续集中的数据。

## 2.2.除留余数法

设哈希表种允许的地址数为 $m$，取不大于 $m$ 但最接近 $m$ 的质数 $p$ 作为除数，则按照哈希函数：$Hash(key) = key \% p,(p <= m)$ 可以将关键码转化为哈希地址。

## 2.3.平方取中法

将一个数作平方后，取中间的一段数位作为哈希地址即可。这种方法适用于无法得知关键字分布，但是位数不是很大的情况。

## 2.4.折叠法

将关键字从左到右分割为位数相等的几部分（最后一部分位数可以缩短一些），然后将几部分叠加求和，并按哈希表长，取后几位作为哈希地址。

## 2.5.随机数法

很直接，将随机数限定在某个范围内，直接使用 $Hash(key) = random(key)$。

## 2.6.数学分析法

# 3.哈希冲突

哈希冲突/哈希碰撞主要是因为哈希函数的设置，导致多个输入得出一个哈希地址的冲突现象，我们根据哈希冲突的现象得出两种哈希的实现方法。

## 3.1.闭散列/封闭地址法

如果发生哈希冲突，而哈希表未被装满，则哈希表中还有存储位置，从冲突地址开始循环遍历哈希表，知道找到一个空闲的位置，这是一种零和博弈，因此这种方法在实践中不常使用。

### 3.1.1.一次探测

这种探测是线性探测冲突就直接找下一个等距的空闲地址存储。

### 3.2.1.多次探测

这种探测是上述探测的优化，并不是等距查找空闲地址存储，而是带有跳跃性、多次方的，可以大大降低之后映射的哈希碰撞概率。

## 3.2.开散列/开放地址法

开散列又叫链地址法（开链法），首先对关键码进行哈希函数，计算出哈希地址，将相同哈希地址的关键码归于一个集合，每一个集合就称为一个桶，各个桶中的元素通过一个单链表链接起来，而各链表的头节点存储在哈希表中。因此，每一个桶中放的都是相互哈希冲突的元素。

这种实现在实践中更加常用，插入效率很高，整体冲突得到缓解（因为没有探测操作，一些关键字发生哈希冲突后不会占用本就有限的资源）

# 4.哈希实现

## 4.1.封闭地址实现

```cpp
//哈希表：封闭地址实现
#pragma once
#include <iostream>
#include <utility>
#include <vector>

namespace limou
{
	//1.状态
	enum State
	{
		EMPTY,	//空的
		EXIST,	//存在
		DELETE	//删除
	};

	//2.哈希数据
	template <typename K, typename V>
	struct HashData
	{
		std::pair<K, V> _kv;
		State _state = EMPTY;
	};

	//3.哈希表
	template <typename K, typename V>
	class HashTable
	{
	public://成员函数
		bool Insert(const std::pair<K, V>& kv)
		{
			//排除重复数据
			if (Find(kv.first))	
				return false;

			//检查负载因子
			if (_table.size() == 0 || _n * 10 / _table.size() >= 7)//“本身就没有容量”或者“达到 70% ”就扩容
			{
				//创建出一个新的哈希表，并且其可映射范围为原哈希表的两倍
				size_t newSize = _table.size() == 0 ? 10 : _table.size() * 2;
				HashTable<K, V> newht;
				newht._table.resize(newSize);

				//将原 vector 重新映射到新 vector 上，防止数据映射错乱
				for (auto& data : _table)
				{
					if (data._state == EXIST)//将原哈希表放入数据映射到新哈希表上
					{
						newht.Insert(data._kv);
					}
				}

				_table.swap(newht._table);
			}

			//给出哈希地址
			size_t hashi = kv.first % _table.size();//不可以使用 capacity()，否则使用 [] 会越界
			
			//解决哈希冲突
			size_t i = 1;
			size_t index = hashi;
			while (_table[index]._state == EXIST)//如果哈希地址上已经有对应值，则向后探测
			{
				index = hashi + i;		//向后探测
				index %= _table.size();	//防止越界，并且达成循环探测
				i++;
			}
			
			_table[index]._kv = kv;
			_table[index]._state = EXIST;
			_n++;

			return true;
		}

		HashData<K, V>* Find(const K& key)
		{
			//避免除零错误
			if (_table.size() == 0)
			{
				return nullptr;//避免后续计算哈希地址时，出现除零错误
			}

			//改变数据状态
			size_t hashi = key % _table.size();
			size_t i = 1;
			size_t index = hashi;
			while (_table[index]._state != EMPTY)//只要不是空就持续走下去
			{
				if (_table[index]._state == EXIST 
					&& _table[index]._kv.first == key)//只要是对应值，并且状态处于“存在”状态（因为后续的删除是“假删除”，原数据还在，只不过是状态改为删除状态），就返回对应指针
				{
					return &_table[index];
				}

				index = hashi + i;		//向后探测
				index %= _table.size();	//防止越界，并且达成循环探测
				i++;

				if (index == hashi)//说明已经查找了一圈，依旧没有找到对应值
				{
					break;
				}
			}

			return nullptr;
		}

		bool Erase(const K& key)
		{
			//注意这是一种假删除，仅仅只是改变状态，因此前面的代码要综合考量
			HashData<K, V>* ret = Find(key);
			if (ret)
			{
				ret->_state = DELETE;
				_n--;
				return true;
			}

			return false;
		}

	private://成员变量
		std::vector<HashData<K, V>> _table;	//直接使用 vector 更加方便，之前我们已经模拟实现顺序表了，就不要反复实现了
		size_t _n = 0;							//存储的数据个数
	};
}
```

## 4.2.开放地址实现

```cpp
//哈希表：开放地址实现
#pragma once
#include <iostream>
#include <utility>
#include <vector>

namespace limou
{
	//1.哈希数据
	template <typename K, typename V>
	struct HashNode
	{
		HashNode(const std::pair<K, V>& kv)
			: _next(nullptr),
			_kv(kv)
		{}

		HashNode<K, V>* _next;
		std::pair<K, V> _kv;
	};

	//2.哈希表
	template <typename K, typename V>
	class HashTable
	{
		typedef HashNode<K, V> Node;

	public://成员函数
		~HashTable()
		{
			for (auto& cur : _tables)
			{
				while (cur)
				{
					Node* next = cur->_next;
					delete cur;
					cur = next;
				}
			}
		}
		bool Insert(const std::pair<K, V>& kv)
		{
			//防止冗余
			if (Find(kv.first))
			{
				return false;
			}

			//扩容机制
			
			//由于扩容会让哈希表重新映射进而减低冲突概率，
			//因此我们设定负载因子为 1 时发生扩容，
			//这样就不会让链桶太长，导致查找效率降低
			if (_n == _tables.size())
			{
				size_t newSize = _tables.size() == 0 ? 10 : _tables.size() * 2;//决定新空间大小，生成新哈希表
				std::vector<Node*> newTables;
				newTables.resize(newSize);

				for (auto&cur : _tables)//遍历旧哈希表
				{
					while (cur)//遍历旧哈希表内的桶
					{
						Node* next = cur->_next;//保存 next 链表

						size_t hashi = cur->_kv.first % newTables.size();//生成旧桶内数据在新哈希表内的哈希地址

						cur->_next = newTables[hashi];//头插到新哈希表内
						newTables[hashi] = cur;

						cur = next;
					}
				}

				_tables.swap(newTables);//交换新旧哈希表
			}

			//映射链桶
			size_t hashi = kv.first % _tables.size();//根据关键字得到哈希地址

			Node* newNode = new Node(kv);//生成链表结点，存储数据

			newNode->_next = _tables[hashi];//将结点头插到桶的头部
			_tables[hashi] = newNode;
			
			++_n;//更新负载因子

			return true;
		}
		Node* Find(const K& key)
		{
			if (_tables.size() == 0)
			{
				return nullptr;
			}

			size_t hashi = key % _tables.size();
			Node* cur = _tables[hashi];
			while (cur)
			{
				if (cur->_kv.first == key)
				{
					return cur;
				}
				cur = cur->_next;
			}

			return nullptr;
		}
		bool Erase(const K& key)
		{
			size_t hashi = key % _tables.size();
			Node* prev = nullptr;
			Node* cur = _tables[hashi];
			while (cur)
			{
				if (cur->_kv.first == key)
				{
					if (prev != nullptr)
					{
						prev->_next = cur->_next;
					}
					else//prev == nullptr（删除头节点的情况）
					{
						_tables[hashi] = cur->_next;
					}
					delete cur;
					return true;
				}
				else
				{
					prev = cur;
					cur = cur->_next;
				}
			}

			return false;
		}

	private://成员变量
		std::vector<Node*> _tables;		//链桶头指针存储表（由于 void resize (size_type n, value_type val = value_type()); 所以后续使用 resize()会承担初始化赋值的工作，即：置为空）
		size_t _n = 0;					//存储有效数据个数
	};
}
```

但是上述的哈希表还是有一些缺陷，例如：如果 `key` 是 `string` 类型怎么办？其他的自定义类型呢？这个时候就可以使用仿函数进行优化。

```cpp
#pragma once
#include <iostream>
#include <utility>
#include <vector>

namespace limou
{
	//1.哈希数据
	template <typename K, typename V>
	struct HashNode
	{
		HashNode(const std::pair<K, V>& kv)
			: _next(nullptr),
			_kv(kv)
		{}

		HashNode<K, V>* _next;
		std::pair<K, V> _kv;
	};

	//2.仿函数
	template<typename K>
	struct HashFunc
	{
		size_t operator()(const K& key)
		{
			return key;
		}
	};

	template<>//仿函数特化
	struct HashFunc<std::string>
	{
		size_t operator()(const std::string& str)
		{
			//return str[0];//这样实现不太好
			size_t add = 0;;
			for (auto ch : str)
			{
				add += ch;
				ch *= 31;//BKDR 算法（“玄学”）
			}
			return add;
		}
	};

	//3.哈希表
	template <typename K, typename V, typename Hash = HashFunc<K>>//最后一个类型是提供给仿函数的
	class HashTable
	{
		typedef HashNode<K, V> Node;

	public://成员函数
		~HashTable()
		{
			for (auto& cur : _tables)
			{
				while (cur)
				{
					Node* next = cur->_next;
					delete cur;
					cur = next;
				}
			}
		}
		bool Insert(const std::pair<K, V>& kv)
		{
			//防止冗余
			if (Find(kv.first))
			{
				return false;
			}

			//扩容机制
			//由于扩容会让哈希表重新映射进而减低冲突概率，
			//因此我们设定负载因子为 1 时发生扩容，
			//这样就不会让链桶太长，导致查找效率降低
			Hash hash;//仿函数
			if (_n == _tables.size())
			{
				size_t newSize = _tables.size() == 0 ? 10 : _tables.size() * 2;//决定新空间大小，生成新哈希表
				std::vector<Node*> newTables;
				newTables.resize(newSize);

				for (auto& cur : _tables)//遍历旧哈希表
				{
					while (cur)//遍历旧哈希表内的桶
					{
						Node* next = cur->_next;//保存 next 链表

						size_t hashi = hash(cur->_kv.first) % newTables.size();//生成旧桶内数据在新哈希表内的哈希地址

						cur->_next = newTables[hashi];//头插到新哈希表内
						newTables[hashi] = cur;

						cur = next;
					}
				}

				_tables.swap(newTables);//交换新旧哈希表
			}

			//映射链桶
			size_t hashi = hash(kv.first) % _tables.size();//根据关键字得到哈希地址

			Node* newNode = new Node(kv);//生成链表结点，存储数据

			newNode->_next = _tables[hashi];//将结点头插到桶的头部
			_tables[hashi] = newNode;

			++_n;//更新负载因子

			return true;
		}
		Node* Find(const K& key)
		{
			if (_tables.size() == 0)
			{
				return nullptr;
			}

			Hash hash;//仿函数
			size_t hashi = hash(key) % _tables.size();
			Node* cur = _tables[hashi];
			while (cur)
			{
				if (cur->_kv.first == key)
				{
					return cur;
				}
				cur = cur->_next;
			}

			return nullptr;
		}
		bool Erase(const K& key)
		{
			Hash hash;
			size_t hashi = hash(key) % _tables.size();
			Node* prev = nullptr;
			Node* cur = _tables[hashi];
			while (cur)
			{
				if (cur->_kv.first == key)
				{
					if (prev != nullptr)
					{
						prev->_next = cur->_next;
					}
					else//prev == nullptr（删除头节点的情况）
					{
						_tables[hashi] = cur->_next;
					}
					delete cur;
					return true;
				}
				else
				{
					prev = cur;
					cur = cur->_next;
				}
			}

			return false;
		}

	private://成员变量
		std::vector<Node*> _tables;		//链桶头指针存储表（由于 void resize (size_type n, value_type val = value_type()); 所以后续使用 resize()会承担初始化赋值的工作，即：置为空）
		size_t _n = 0;					//存储有效数据个数
	};
}
```

# 5.哈希封装

下面我们就结合上面的知识，对哈希做一个封装，使其行为类似库中的 `unordered_set` 和 `unordered_map` 容器。

哈希封装和上一节的 `set` 和 `map` 封装有一些类似之处，这里我留一个坑，等以后再来详细解答编码过程。

## 5.1.hash_table.hpp

```cpp
//hash_table.hpp
#pragma once
#include <iostream>
#include <utility>
#include <vector>

//仿函数
//任意类型要做 unordered_set 和 unordered_map 的 key，需要支持：“转化为可取模整型仿函数”和“== 比较”
//任意类型要做 map 和 set 的 key，需要支持：“仿函数 < 的比较”
template<typename K>
struct HashFunc
{
	size_t operator()(const K& key)
	{
		return key;
	}
};

template<>//仿函数特化
struct HashFunc<std::string>
{
	size_t operator()(const std::string& str)
	{
		//return str[0];//这样实现不太好，冲突概率高
		size_t add = 0;;
		for (auto ch : str)
		{
			add += ch;
			ch *= 31;//BKDR 算法（“玄学”）
		}
		return add;
	}
};

namespace HashBucket
{
	//1.哈希数据
	template <typename T>
	struct HashNode
	{
		HashNode(const T& data)
			: _next(nullptr),
			_data(data)
		{}

		HashNode<T>* _next;
		T _data;
	};

	//2.迭代器
	//前置声明（因为这里出现了互相引用的问题）
	template <typename K, typename T, typename KeyOfT, typename Hash>
	class HashTable;

	template <typename K, typename T, typename Ref, typename Ptr, typename KeyOfT, typename Hash>
	struct __HashIterator
	{
		typedef HashNode<T> Node;
		typedef HashTable<K, T, KeyOfT, Hash> HT;
		typedef __HashIterator<K, T, Ref, Ptr, KeyOfT, Hash> Self;
		typedef __HashIterator<K, T, T&, T*, KeyOfT, Hash> Iterator;//辅助：让普通迭代器可以转化为常量迭代器

		__HashIterator(Node* node, const HT* ht) 
			: _node(node), _ht(ht)
		{}
		__HashIterator(const Iterator& it)
			: _node(it._node), _ht(it._ht)
		{}

		Ref operator*()
		{
			return _node->_data;
		}
		Ptr operator->()
		{
			return &_node->_data;
		}
		bool operator!=(const Self& s)
		{
			return _node != s._node;//比较指针即可
		}
		Self& operator++()
		{
			if (_node->_next != nullptr)
			{
				_node = _node->_next;
			}
			else
			{
				KeyOfT kot;
				Hash hash;
				size_t hashi = hash(kot(_node->_data)) % _ht->_tables.size();//得到当前桶的位置
				hashi++;//由于当前位置一定为空，因此直接跳过当前位置的判断
				while (hashi < _ht->_tables.size())
				{
					if (_ht->_tables[hashi])
					{
						_node = _ht->_tables[hashi];
						break;
					}
					else
					{
						hashi++;
					}
				}

				//代码走到这里只有两种情况：一是整个表都被遍历完了，二是 break 出来的
				if (hashi == _ht->_tables.size())
				{
					_node = nullptr;
				}
			}
			return *this;

		}

		Node* _node;
		const HT* _ht;
	};

	//3.哈希表
	template <typename K, typename T, typename KeyOfT, typename Hash>
	//第一个标记 key 的类型，第二个是 key 或 data<key, value> 的类型，最后两个是提供给仿函数的
	class HashTable
	{
		//友元类
		template <typename K, typename T, typename Ref, typename Ptr, typename KeyOfT, typename Hash>
		friend struct __HashIterator;

		//类型重定义
	private:
		typedef HashNode<T> Node;//T 已经是泛型，有可能是 key，也有可能是 key-value
	
		//迭代器
	public:
		typedef __HashIterator<K, T, T&, T*, KeyOfT, Hash> iterator;
		typedef __HashIterator<K, T, const T&, const T*, KeyOfT, Hash> const_iterator;

		iterator begin()
		{
			Node* cur = nullptr;//一开始的节点位置必须要重新计算出来，因为不保证第一个桶的第一个元素就是开始结点
			for (size_t i = 0; i < _tables.size(); i++)
			{
				cur = _tables[i];
				if (cur != nullptr)
				{
					break;
				}
			}
			return iterator(cur, this);
		}
		iterator end()
		{
			return iterator(nullptr, this);
		}
		const_iterator begin() const
		{
			Node* cur = nullptr;//一开始的节点位置必须要重新计算出来，因为不保证第一个桶的第一个元素就是开始结点
			for (size_t i = 0; i < _tables.size(); i++)
			{
				cur = _tables[i];
				if (cur != nullptr)
				{
					break;
				}
			}
			return const_iterator(cur, this);
		}
		const_iterator end() const
		{
			return const_iterator(nullptr, this);
		}

		//成员函数
	public:
		~HashTable()
		{
			for (auto& cur : _tables)
			{
				while (cur)
				{
					Node* next = cur->_next;
					delete cur;
					cur = next;
				}
			}
		}
		std::pair<iterator, bool> Insert(const T& data)
		{
			//防止冗余
			KeyOfT kot;
			iterator it = Find(kot(data));
			if (it != end())
			{
				return std::make_pair(it, false);
			}

			//扩容机制
			//由于扩容会让哈希表重新映射进而减低冲突概率，
			//因此我们设定负载因子为 1 时发生扩容，
			//这样就不会让链桶太长，导致查找效率降低
			Hash hash;//仿函数
			if (_n == _tables.size())
			{
				size_t newSize = _tables.size() == 0 ? 10 : _tables.size() * 2;//决定新空间大小，生成新哈希表
				std::vector<Node*> newTables;
				newTables.resize(newSize);

				for (auto& cur : _tables)//遍历旧哈希表
				{
					while (cur)//遍历旧哈希表内的桶
					{
						Node* next = cur->_next;//保存 next 链表

						size_t hashi = hash(kot(cur->_data)) % newTables.size();//生成旧桶内数据在新哈希表内的哈希地址

						cur->_next = newTables[hashi];//头插到新哈希表内
						newTables[hashi] = cur;

						cur = next;
					}
				}

				_tables.swap(newTables);//交换新旧哈希表
			}

			//映射链桶
			size_t hashi = hash(kot(data)) % _tables.size();//根据关键字得到哈希地址

			Node* newNode = new Node(data);//生成链表结点，存储数据

			newNode->_next = _tables[hashi];//将结点头插到桶的头部
			_tables[hashi] = newNode;

			++_n;//更新负载因子

			return std::make_pair(iterator(newNode, this), true);
		}
		iterator Find(const K& key)
		{
			if (_tables.size() == 0)
			{
				return end();
			}

			KeyOfT kot;//仿函数，辅助找到 key
			Hash hash;//仿函数，找到适合的映射方式，返回 int
			
			size_t hashi = hash(key) % _tables.size();
			Node* cur = _tables[hashi];
			while (cur)
			{
				if (kot(cur->_data) == key)
				{
					return iterator(cur, this);
				}
				cur = cur->_next;
			}

			return end();
		}
		bool Erase(const K& key)
		{
			KeyOfT kot;
			Hash hash;
			size_t hashi = hash(key) % _tables.size();
			Node* prev = nullptr;
			Node* cur = _tables[hashi];
			while (cur)
			{
				if (kot(cur->_data) == key)
				{
					if (prev != nullptr)
					{
						prev->_next = cur->_next;
					}
					else//prev == nullptr（删除头节点的情况）
					{
						_tables[hashi] = cur->_next;
					}
					delete cur;
					return true;
				}
				else
				{
					prev = cur;
					cur = cur->_next;
				}
			}

			return false;
		}

		//成员变量
	private:
		std::vector<Node*> _tables;		//链桶头指针存储表（由于 void resize (size_type n, value_type val = value_type()); 所以后续使用 resize()会承担初始化赋值的工作，即：置为空）
		size_t _n = 0;					//存储有效数据个数
	};
}
```

## 5.2.unordered_set.hpp

```cpp
//unordered_set.hpp
#pragma once
#include "hash_table.hpp"

namespace Limou
{
	template<typename K, typename Hash = HashFunc<K>>
	class UnorderedSet
	{
		//仿函数结构体：辅助其他函数取得 key
	public:
		struct SetKeyOfT
		{
			const K& operator()(const K& key)
			{
				return key;
			}
		};

		//迭代器
		typedef typename HashBucket::HashTable<K, K, SetKeyOfT, Hash>::const_iterator iterator;
		typedef typename HashBucket::HashTable<K, K, SetKeyOfT, Hash>::const_iterator const_iterator;
		iterator begin()
		{
			return _ht.begin();
		}
		iterator end()
		{
			return _ht.end();
		}
		const_iterator begin() const
		{
			return _ht.begin();
		}
		const_iterator end() const
		{
			return _ht.end();
		}

		//成员函数
	public:
		std::pair<iterator, bool> Insert(const K& key)
		{
			return _ht.Insert(key);
		}
		iterator Find(const K& key)
		{
			return _ht.Find(key);
		}
		bool Erase(const K& key)
		{
			return _ht.Erase(key);
		}

		//成员变量
	private:
		HashBucket::HashTable<K, K, SetKeyOfT, Hash> _ht;
	};
}
```

## 5.3.unordered_map.hpp

```cpp
//unordered_map.hpp
#pragma once
#include "hash_table.hpp"

namespace Limou
{
	template<typename K, typename V, typename Hash = HashFunc<K>>
	class UnorderedMap
	{
	public:
		//仿函数结构体：辅助其他函数取得 key
		struct MapKeyOfT
		{
			const K& operator()(const std::pair<K, V>& kv)
			{
				return kv.first;
			}
		};

		//迭代器
		typedef typename HashBucket::HashTable<K, std::pair<const K, V>, MapKeyOfT, Hash>::iterator iterator;
		typedef typename HashBucket::HashTable<K, std::pair<const K, V>, MapKeyOfT, Hash>::const_iterator const_iterator;
		iterator begin()
		{
			return _ht.begin();
		}
		iterator end()
		{
			return _ht.end();
		}
		const_iterator begin() const
		{
			return _ht.begin();
		}
		const_iterator end() const
		{
			return _ht.end();
		}

		//成员函数
	public:
		std::pair<iterator, bool> Insert(const std::pair<K, V>& kv)
		{
			return _ht.Insert(kv);
		}
		iterator Find(const K& key)
		{
			return _ht.Find(key);
		}
		bool Erase(const K& key)
		{
			return _ht.Erase(key);
		}
		V& operator[](const K& key)
		{
			std::pair<iterator, bool> ret = Insert(std::make_pair(key, V()));
			return ret.first->second;
		}

		//成员变量
	private:
		HashBucket::HashTable<K, std::pair<const K, V>, MapKeyOfT, Hash> _ht;
	};
}
```

## 5.4.main.cpp

```cpp
//main.cpp
#include "unordered_set.hpp"
#include "unordered_map.hpp"
#include <vector>
#include <string>

void USetTest_1(Limou::UnorderedSet<int>& us)
{
	Limou::UnorderedSet<int>::iterator it = us.begin();
	while (it != us.end())
	{
		//*it = 1;
		std::cout << *it << " ";
		++it;
	}
	std::cout << '\n';
}

void USetTest_2(const Limou::UnorderedSet<int>& us)//这个测试必须使用引用，因为我没有写拷贝构造函数
{
	Limou::UnorderedSet<int>::const_iterator cit = us.begin();
	while (cit != us.end())
	{
		//*cit = 1;
		std::cout << *cit << " ";
		++cit;
	}
	std::cout << '\n';
}

void UMapTest_1(Limou::UnorderedMap<int, int>& ms)
{
	Limou::UnorderedMap<int, int>::iterator it = ms.begin();
	while (it != ms.end())
	{
		//it->first = 1;
		it->second = 1;
		std::cout << it->first << "-" << it->second << " ";
		++it;
	}
	std::cout << '\n';
}

void UMapTest_2(const Limou::UnorderedMap<int, int>& ms)
{
	Limou::UnorderedMap<int, int>::const_iterator cit = ms.begin();
	while (cit != ms.end())
	{
		//cit->first = 1;
		//cit->second = 1;
		std::cout << cit->first << "-" << cit->second << " ";
		++cit;
	}
	std::cout << '\n';
}

int main()
{
	int arr[] = { 3,33,2,13,5,12,1002 };

	Limou::UnorderedSet<int> us;
	for (auto e : arr)
	{
		us.Insert(e);
	}

	Limou::UnorderedMap<int, int> ms;
	for (auto e : arr)
	{
		ms.Insert(std::make_pair(e, e));
	}

	USetTest_1(us);
	USetTest_2(us);

	UMapTest_1(ms);
	UMapTest_2(ms);

	return 0;
}
```

# 6.哈希应用

## 6.1.位图

给 `40` 亿个不重复、没排过序的无符号整数。给定一个无符号整数，如何快速判断一个数是否在这 `40` 亿个数中。

如果存储这 `40` 亿个数就会使用将近 `16G` 的内存空间，这几乎就是一台个人电脑的普遍配置（至少在 `2022` 年是这样）。我们可以使用位图来优化这一“检验存在”的问题，位图是一种特殊的哈希，使用直接定址法即可实现。

```cpp
//位图实现
#pragma once
#include <iostream>
#include <vector>
#include <cassert>
namespace Limou
{
	template<size_t N>//非类型模板参数 N
	class BitSet
	{
	public:
		BitSet()
		{
			_bits.resize(N / 8 + 1, 0);//可以浪费几个比特位，但是不可以缺少
		}
		//0000 0000
		void Set(size_t x)//设置为 1
		{
			assert(x < N);
			size_t i = x / 8;//计算出 x 映射到数组中第 i 个 char 数据
			size_t j = x % 8;//计算出 x 映射到第 i 个 char 中的第 j 个比特位
			_bits[i] |= (1 << j);//设置为 1
		}
		void Reset(size_t x)//设置为 0
		{
			assert(x < N);
			size_t i = x / 8;//计算出 x 映射到数组中第 i 个 char 数据
			size_t j = x % 8;//计算出 x 映射到第 i 个 char 中的第 j 个比特位
			_bits[i] &= ~(1 << j);//设置为 0
		}
		bool Test(size_t x)
		{
			assert(x < N);
			size_t i = x / 8;//计算出 x 映射到数组中第 i 个 char 数据
			size_t j = x % 8;//计算出 x 映射到第 i 个 char 中的第 j 个比特位
			return _bits[i] & (1 << j);
		}

	private:
		std::vector<char> _bits;
	};
}
```

只要将存在的数对应的比特位设置为 `1`，不存在的设置为 `0`，则可以大大提高时间和空间复杂度。

### 6.1.1.应用一

给定 `100` 亿个整数，设计算法找到只出现一次的整数。

>   解析：设置两个位图结构，然后规定 `00` 该数出现 `0` 次，`01` 该数出现 `1` 次，`10` 该数出现 `2` 次或以上。
>
>   ```cpp
>   #pragma once
>   #include <iostream>
>   #include <vector>
>   #include <cassert>
>   namespace Limou
>   {
>   	template<size_t N>//非类型模板参数 N
>   	class BitSet
>   	{
>   	public:
>   		BitSet()
>   		{
>   			_bits.resize(N / 8 + 1, 0);//可以浪费几个比特位，但是不可以缺少
>   		}
>   		//0000 0000
>   		void Set(size_t x)//设置为 1
>   		{
>   			assert(x < N);
>   			size_t i = x / 8;//计算出 x 映射到数组中第 i 个 char 数据
>   			size_t j = x % 8;//计算出 x 映射到第 i 个 char 中的第 j 个比特位
>   			_bits[i] |= (1 << j);//设置为 1
>   		}
>   		void Reset(size_t x)//设置为 0
>   		{
>   			assert(x < N);
>   			size_t i = x / 8;//计算出 x 映射到数组中第 i 个 char 数据
>   			size_t j = x % 8;//计算出 x 映射到第 i 个 char 中的第 j 个比特位
>   			_bits[i] &= ~(1 << j);//设置为 0
>   		}
>   		bool Test(size_t x)
>   		{
>   			assert(x < N);
>   			size_t i = x / 8;//计算出 x 映射到数组中第 i 个 char 数据
>   			size_t j = x % 8;//计算出 x 映射到第 i 个 char 中的第 j 个比特位
>   			return _bits[i] & (1 << j);
>   		}
>   
>   	private:
>   		std::vector<char> _bits;
>   	};
>   }
>   
>   namespace Limou
>   {
>   	template<size_t N>
>   	class TwoBitSet
>   	{
>   	public:
>   		void Set(size_t x)
>   		{
>   			//00 代表什么都没有
>   			//01 代表出现了一次
>   			//00 代表两次及以上
>   			if (_bs1.Test(x) == false && _bs2.Test(x) == false)//00 -> 01
>   			{
>   				_bs2.Set(x);
>   			}
>   			else if (_bs1.Test(x) == false && _bs2.Test(x) == true)//01 -> 10
>   			{
>   				_bs1.Set(x);
>   				_bs2.Reset(x);
>   			}
>   		}
>   		void Print()
>   		{
>   			for (size_t i = 1; i < N; i++)
>   			{
>   				if (_bs2.Test(i))
>   				{
>   					std::cout << i << '\n';
>   				}
>   			}
>   		}
>   
>   	private:
>   		BitSet<N> _bs1;
>   		BitSet<N> _bs2;
>   	};
>   }
>   ```

### 6.1.2.应用二

给两个文件，分别有 `100` 亿个整数，我们只有 `1G` 内存，如何找到两个文件交集？ 

>   解析：同样构造两个位图，两个分别设置好自己的位图，最后 `&` 两个位图的所有比特位即可，最后新生成的位图就是交集的位图。

### 6.1.3.应用三

`1` 个文件有 `100` 亿个 `int`，`1G` 内存，设计算法找到出现次数不超过 `2` 次的所有整数。

>   解析：先设置好位图，规定状态 `00` 该数出现 `0` 次， `01` 该数出现 `1` 次， `10` 该数出现 `2` 次， `11` 该数出现 `3` 次或以上。实际上，这就是应用一的拓展应用，都是状态的设置。

## 6.2.布隆过滤器

布隆过滤器对一个 `key` 使用多个哈希函数，同时设置位图的多个比特位。设置好数据后，之后查询某一个关键字的时候，对应多个比特位都为 `0`，那就说明这个关键字一定不存在。如果对应的比特位都为 `1`，则说明有可能存在，但有可能和其他关键字发生冲突，不一定真的存在该关键字（但是布隆过滤器允许这种情况的发生）。

布隆过滤器允许误判的场景，比如：判断一个名称是否被使用过。

```cpp
//布隆过滤器允许
#pragma once
#include <iostream>
#include <string>
#include <vector>
#include <cassert>
namespace Limou
{
	template<size_t N>//非类型模板参数 N
	class BitSet
	{
	public:
		BitSet()
		{
			_bits.resize(N / 8 + 1, 0);//可以浪费几个比特位，但是不可以缺少
		}
		//0000 0000
		void Set(size_t x)//设置为 1
		{
			assert(x < N);
			size_t i = x / 8;//计算出 x 映射到数组中第 i 个 char 数据
			size_t j = x % 8;//计算出 x 映射到第 i 个 char 中的第 j 个比特位
			_bits[i] |= (1 << j);//设置为 1
		}
		void Reset(size_t x)//设置为 0
		{
			assert(x < N);
			size_t i = x / 8;//计算出 x 映射到数组中第 i 个 char 数据
			size_t j = x % 8;//计算出 x 映射到第 i 个 char 中的第 j 个比特位
			_bits[i] &= ~(1 << j);//设置为 0
		}
		bool Test(size_t x)
		{
			assert(x < N);
			size_t i = x / 8;//计算出 x 映射到数组中第 i 个 char 数据
			size_t j = x % 8;//计算出 x 映射到第 i 个 char 中的第 j 个比特位
			return (bool)(_bits[i] & (1 << j));
		}

	private:
		std::vector<char> _bits;
	};
}

namespace Limou
{
	//随便找的哈希函数
	struct BKDRHash
	{
		size_t operator()(const std::string& str)
		{
			size_t hash = 0;
			for (auto ch : str)
			{
				hash += ch;
				hash *= 31;
			}
			return hash;
		}
	};
	struct APHash
	{
		size_t operator()(const std::string& str)
		{
			size_t hash = 0;
			for (long i = 0; i < str.size(); i++)
			{
				size_t ch = str[i];
				if ((i & 1) == 0)
				{
					hash ^= ((hash << 7) ^ ch ^ (hash >> 3));
				}
				else
				{
					hash ^= (~((hash << 11) ^ ch ^ (hash >> 5)));
				}
			}
			return hash;
		}
	};
	struct DJBHash
	{
		size_t operator()(const std::string& str)
		{
			size_t hash = 5381;
			for (auto ch : str)
			{
				hash += (hash << 5) + ch;
			}
			return hash;
		}
	};

	//布隆过滤器结构体
	template<size_t N, typename Key = std::string,
		typename Hash1 = BKDRHash,
		typename Hash2 = APHash,
		typename Hash3 = DJBHash>//N 是 key 的个数
	class BloomFileter
	{
	public:
		void Set(const K& key)
		{
			size_t len = N * _x;

			//使用三个哈希函数，设置位图中的三个位置
			size_t hash1 = Hash1()(Key) % len;
			_bs.Set(hash1);
			size_t hash2 = Hash2()(Key) % len;
			_bs.Set(hash2);
			size_t hash3 = Hash3()(Key) % len;
			_bs.Set(hash3);
		}
		bool Test(const K& key)
		{
			size_t len = N * _x;

			//三个位置只要都存在就说明 key 存在
			size_t hash1 = Hash1()(Key) % len;
			if (!_bs.test(hash1))
			{
				return false;
			}
			size_t hash2 = Hash2()(Key) % len;
			if (!_bs.test(hash2))
			{
				return false;
			}
			size_t hash3 = Hash3()(Key) % len;
			if (!_bs.test(hash3))
			{
				return false;
			}

			//注意一个布隆过滤器有以下特点：
			//key 存在，不能确定，有可能误判
			//key 不存在，可以确定，不存在误判
			return true;
		}

	private:
		static const size_t _x = 4;
		BitSet<N * _x> _bs;
	};
}
```

 ### 6.2.1.应用一

给两个文件，分别有 `100` 亿个 `query`，我们只有 `1G` 内存，如何找到两个文件交集？分别给出精确算法和近似算法。

>   解析：用哈希切分，这里还没有研究明白。

### 6.2.2.应用二

如何扩展 `BloomFilter` 使得它支持删除元素的操作。

>   解析：严格来说单纯的布隆过滤器是无法做到删除操作的，除非不再使用一个位，而使用多比特位来引用计数。
