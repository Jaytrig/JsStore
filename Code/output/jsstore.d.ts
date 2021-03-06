declare module KeyStore {
    interface IError {
        Name: string;
        Value: string;
    }
    class Utils {
        /**
         * determine and set the DataBase Type
         *
         *
         * @memberOf UtilityLogic
         */
        static setDbType: () => void;
    }
}
declare module KeyStore {
    interface ISelect {
        From: any;
        Where: any;
    }
    interface IDelete {
        From: string;
        Where: any;
    }
    enum ConnectionStatus {
        Connected = "connected",
        Closed = "closed",
        NotStarted = "not_connected",
    }
    interface KeyStoreStatus {
        ConStatus: ConnectionStatus;
        LastError: string;
    }
    interface IInsert {
        TableName: string;
        Set: {
            Key: string;
            Value;
            any;
        };
    }
    interface IWebWorkerRequest {
        Name: string;
        Query: any;
        OnSuccess: Function;
        OnError: Function;
    }
    interface IWebWorkerResult {
        ErrorOccured: boolean;
        ErrorDetails: any;
        ReturnedValue: any;
    }
    var RequestQueue: Array<IWebWorkerRequest>, TableName: string, IsCodeExecuting: boolean;
}
declare module KeyStore {
    var prcoessExecutionOfCode: (request: IWebWorkerRequest) => void;
    var executeCode: () => void;
    var executeCodeDirect: (request: IWebWorkerRequest) => void;
    var processFinishedRequest: (message: IWebWorkerResult) => void;
}
declare module KeyStore {
    module Business {
        class Base {
            Results: any;
            OnSuccess: Function;
            OnError: Function;
            ErrorOccured: boolean;
            ErrorCount: number;
            Transaction: IDBTransaction;
            ObjectStore: IDBObjectStore;
            protected onErrorOccured: (e: any) => void;
        }
    }
}
declare module KeyStore {
    module Business {
        class Get extends Base {
            Query: ISelect;
            private get;
            constructor(query: ISelect, onSuccess: Function, onError: Function);
        }
    }
}
declare module KeyStore {
    module Business {
        class Set extends Base {
            private setData;
            constructor(query: IInsert, onSuccess: Function, onError: Function);
        }
    }
}
declare module KeyStore {
    module Business {
        class Remove extends Base {
            Query: IDelete;
            RowAffected: number;
            private remove;
            constructor(query: IDelete, onSuccess: Function, onError: Function);
        }
    }
}
declare module KeyStore {
    module Business {
        class InitDb {
            constructor(dbName: string, tableName: string, onSuccess: Function, onError: Function);
        }
    }
}
declare module KeyStore {
    module Business {
        var DbConnection: any, Status: KeyStoreStatus;
        class Main {
            OnSuccess: Function;
            constructor(onSuccess?: any);
            checkConnectionAndExecuteLogic: (request: IWebWorkerRequest) => void;
            private returnResult;
            private executeLogic;
            set: (query: IInsert, onSuccess: Function, onError: Function) => void;
            remove: (query: IDelete, onSuccess: Function, onError: Function) => void;
            get: (query: ISelect, onSuccess: Function, onError: Function) => void;
            createDb: (tableName: any, onSuccess: Function, onError: Function) => void;
        }
    }
}
declare module KeyStore {
    /**
     * Initialize KeyStore
     *
     */
    var init: () => void;
    /**
    * return the value by key
    *
    * @param {string} key
    * @param {Function} onSuccess
    * @param {Function} [onError=null]
    */
    var get: (key: string, onSuccess: Function, onError?: Function) => any;
    /**
    * insert or update value
    *
    * @param {any} key
    * @param {any} value
    * @param {Function} [onSuccess=null]
    * @param {Function} [onError=null]
    */
    var set: (key: any, value: any, onSuccess?: Function, onError?: Function) => any;
    /**
    * delete value
    *
    * @param {string} key
    * @param {Function} [onSuccess=null]
    * @param {Function} [onError=null]
    */
    var remove: (key: string, onSuccess?: Function, onError?: Function) => any;
}
declare module JsStore {
    enum ErrorType {
        UndefinedColumn = "undefined_column",
        UndefinedValue = "undefined_value",
        UndefinedColumnName = "undefined_column_name",
        UndefinedColumnValue = "undefined_column_value",
        NotArray = "not_array",
        NoValueSupplied = "no_value_supplied",
        ColumnNotExist = "column_not_exist",
        InvalidOp = "invalid_operator",
        NullValue = "null_value",
        BadDataType = "bad_data_type",
        NextJoinNotExist = "next_join_not_exist",
        TableNotExist = "table_not_exist",
        DbNotExist = "db_not_exist",
        IndexedDbUndefined = "indexeddb_undefined",
        IndexedDbBlocked = "indexeddb_blocked",
    }
    enum Occurence {
        First = "f",
        Last = "l",
        Any = "a",
    }
    enum WebWorkerStatus {
        Registered = "registerd",
        Failed = "failed",
        NotStarted = "not_started",
    }
    enum ConnectionStatus {
        Connected = "connected",
        Closed = "closed",
        NotStarted = "not_started",
        UnableToStart = "unable_to_start",
    }
    enum WhereQryOption {
        In = "In",
        Like = "Like",
        Or = "Or",
    }
    enum DataType {
        String = "string",
        Object = "object",
        Array = "array",
    }
}
declare module JsStore {
    interface DbInfo {
        DbName: string;
        Table: {
            Name: string;
            Version: number;
        };
    }
    interface ISelect {
        From: any;
        Where?: any;
        Skip?: number;
        Limit?: number;
        OnSuccess?: Function;
        OnError?: Function;
        Order?: IOrder;
        GroupBy?: any;
        Aggregate?: {
            Max?: any;
            Min?: any;
            Count?: any;
            Sum?: any;
            Avg?: any;
        };
        IgnoreCase?: boolean;
        Distinct?: boolean;
    }
    interface IOrder {
        By?: string;
        Type?: string;
    }
    interface ICount {
        From: any;
        IgnoreCase?: boolean;
        Where?: any;
        OnSuccess?: Function;
        OnError?: Function;
    }
    interface IDelete {
        From: string;
        IgnoreCase?: boolean;
        Where?: any;
        OnSuccess?: Function;
        OnError?: Function;
    }
    interface IUpdate {
        In?: string;
        IgnoreCase?: boolean;
        Set?: any;
        Where?: any;
        OnSuccess?: Function;
        OnError?: Function;
    }
    interface IInsert {
        Into: string;
        Values?: Array<any>;
        Return?: boolean;
        OnSuccess?: Function;
        OnError?: Function;
        SkipDataCheck?: any;
    }
    interface ICondition {
        Column: string;
        Value?: string;
        Op?: string;
    }
    interface ITableJoin {
        Column: string;
        Table: string;
        Where?: any;
        Order?: IOrder;
        JoinType?: string;
        NextJoin?: INextJoin;
    }
    interface ISelectJoin {
        From: IJoin;
        Count?: boolean;
        Skip?: number;
        Limit?: number;
        OnSuccess?: Function;
        OnError?: Function;
    }
    interface IJoin {
        Table1: ITableJoin;
        Join: string;
        Table2: ITableJoin;
    }
    interface INextJoin {
        Table: string;
        Column: string;
    }
    interface JsStoreStatus {
        ConStatus: ConnectionStatus;
        LastError: string;
    }
    interface IWebWorkerRequest {
        Name: string;
        Query: any;
        OnSuccess: Function;
        OnError: Function;
    }
    interface IWebWorkerResult {
        ErrorOccured: boolean;
        ErrorDetails: any;
        ReturnedValue: any;
    }
    interface IError {
        Name: string;
        Message: string;
    }
    interface IAggregate {
        Max: Array<any>;
        Min: Array<any>;
        Sum: Array<any>;
        Count: Array<any>;
        Avg: Array<any>;
    }
}
declare module JsStore {
    var EnableLog: boolean, DbVersion: number, Status: JsStoreStatus, TempResults: Array<any>;
    var throwError: (error: any) => never;
    var getObjectFirstKey: (value: any) => string;
    var log: (msg: any) => void;
    var logError: (msg: any) => void;
}
declare module JsStore {
    class Utils {
        static getError(errorType: ErrorType, errorDetail: any): IError;
        static convertObjectintoLowerCase(obj: any): void;
        /**
         * determine and set the DataBase Type
         *
         *
         * @memberOf MainLogic
         */
        static setDbType: () => void;
    }
}
declare module JsStore {
    /**
    * checks whether db exist or not
    *
    * @param {DbInfo} dbInfo
    * @param {Function} callback
    * @param {Function} errCallBack
    */
    var isDbExist: (dbInfo: DbInfo, callback: Function, errCallBack?: Function) => any;
    /**
    * get Db Version
    *
    * @param {string} dbName
    * @param {Function} callback
    */
    var getDbVersion: (dbName: string, callback: Function) => void;
    /**
    * get Database Schema
    *
    * @param {string} dbName
    * @param {Function} callback
    */
    var getDbSchema: (dbName: string, callback: Function) => void;
    /**
    * check value null or not
    *
    * @param {any} value
    * @returns
    */
    var isNull: (value: any) => boolean;
    /**
    * Enable log
    *
    */
    var enableLog: () => void;
    /**
    * disable log
    *
    */
    var disableLog: () => void;
}
declare module JsStore {
    module Model {
        interface IColumn {
            Name: string;
            AutoIncrement: boolean;
            PrimaryKey: boolean;
            Unique: boolean;
            NotNull: boolean;
            DataType: string;
            Default: any;
        }
        class Column implements IColumn {
            Name: string;
            AutoIncrement: boolean;
            PrimaryKey: boolean;
            Unique: boolean;
            NotNull: boolean;
            DataType: string;
            Default: any;
            constructor(key: IColumn, tableName: string);
        }
    }
}
declare module JsStore {
    module Model {
        interface ITable {
            Name: string;
            Columns: Array<IColumn>;
            Version: number;
        }
        class Table implements ITable {
            Name: string;
            Columns: Array<Column>;
            Version: number;
            RequireDelete: boolean;
            RequireCreation: boolean;
            PrimaryKey: string;
            constructor(table: ITable, dbName: string);
            private setPrimaryKey(dbName);
            private setRequireDelete(dbName);
            private setDbVersion(dbName);
        }
    }
}
declare module JsStore {
    module Model {
        interface IDataBase {
            Name: string;
            Tables: Array<ITable>;
        }
        class DataBase implements IDataBase {
            Name: string;
            Tables: Array<Table>;
            constructor(dataBase: IDataBase);
        }
    }
}
declare module JsStore {
    module Business {
        class BaseHelper {
            protected getTable: (tableName: string) => Table;
            protected getKeyRange: (value: any, op: any) => IDBKeyRange;
            protected getObjectSecondKey: (value: any) => string;
            protected getPrimaryKey: (tableName: any) => any;
            private getKeyPath;
            protected sortNumberInAsc: (values: any) => any;
            protected sortNumberInDesc: (values: any) => any;
            protected sortAlphabetInAsc: (values: any) => any;
            protected sortAlphabetInDesc: (values: any) => any;
            private getCombination(word);
            protected getAllCombinationOfWord(word: any, isArray: any): any[];
        }
    }
}
declare module JsStore {
    module Business {
        class Base extends BaseHelper {
            Error: IError;
            ErrorOccured: boolean;
            ErrorCount: number;
            RowAffected: number;
            OnSuccess: Function;
            OnError: Function;
            Transaction: IDBTransaction;
            ObjectStore: IDBObjectStore;
            Query: any;
            SendResultFlag: Boolean;
            protected onErrorOccured: (e: any, customError?: boolean) => void;
            protected onTransactionTimeout: (e: any) => void;
            protected onExceptionOccured: (ex: DOMException, info: any) => void;
            /**
            * For matching the different column value existance
            *
            * @private
            * @param {any} where
            * @param {any} value
            * @returns
            *
            * @memberOf SelectLogic
            */
            protected checkForWhereConditionMatch(rowValue: any): boolean;
            protected goToWhereLogic: () => void;
            protected makeQryInCaseSensitive: (qry: any) => any;
        }
    }
}
declare module JsStore {
    module Business {
        class CreateDb {
            constructor(dbVersion: any, onSuccess: Function, onError: Function);
        }
    }
}
declare module JsStore {
    module Business {
        class DropDb {
            constructor(name: string, onSuccess: Function, onError: Function);
            deleteDb: (name: string, onSuccess: Function, onError: Function) => void;
        }
    }
}
declare module JsStore {
    module Business {
        class InsertHelper extends Base {
            ValuesAffected: any[];
            Query: IInsert;
            onTransactionCompleted: () => void;
            protected checkModifyInsertValues: (table: any, values: any) => void;
        }
    }
}
declare module JsStore {
    module Business {
        class Insert extends InsertHelper {
            private insertData;
            constructor(query: IInsert, onSuccess: Function, onError: Function);
        }
    }
}
declare module JsStore {
    module Business {
        class BulkInsert extends Base {
            ValuesAffected: any[];
            Query: IInsert;
            ValuesIndex: number;
            Table: Model.ITable;
            onTransactionCompleted: () => void;
            private bulkinsertData;
            constructor(query: IInsert, onSuccess: Function, onError: Function);
        }
    }
}
declare module JsStore {
    module Business {
        class OpenDb {
            constructor(dbVersion: any, onSuccess: Function, onError: Function);
        }
    }
}
declare module JsStore {
    module Business {
        class Clear extends Base {
            constructor(tableName: string, onSuccess: Function, onError: Function);
        }
    }
}
declare module JsStore {
    module Business {
        var DbConnection: any, ActiveDataBase: DataBase;
        class Main {
            OnSuccess: Function;
            constructor(onSuccess?: any);
            checkConnectionAndExecuteLogic: (request: IWebWorkerRequest) => void;
            private changeLogStatus;
            private returnResult;
            private executeLogic;
            openDb: (dbName: any, onSuccess: Function, onError: Function) => void;
            closeDb: () => void;
            dropDb: (onSuccess: Function, onError: Function) => void;
            update: (query: IUpdate, onSuccess: Function, onError: Function) => void;
            insert: (query: IInsert, onSuccess: Function, onError: Function) => void;
            bulkInsert: (query: IInsert, onSuccess: Function, onError: Function) => void;
            delete: (query: IDelete, onSuccess: Function, onError: Function) => void;
            select: (query: any, onSuccess: Function, onError: Function) => void;
            count: (query: any, onSuccess: Function, onError: Function) => void;
            createDb: (dataBase: Model.IDataBase, onSuccess: Function, onError: Function) => void;
            clear: (tableName: string, onSuccess: Function, onError: Function) => void;
            exportJson: (query: ISelect, onSuccess: Function, onError: Function) => void;
        }
    }
}
declare module JsStore {
    module Business {
        module Select {
            class BaseSelect extends Base {
                Results: any[];
                Sorted: boolean;
                SkipRecord: any;
                LimitRecord: any;
                CheckFlag: boolean;
                protected removeDuplicates: () => void;
            }
        }
    }
}
declare module JsStore {
    module Business {
        module Select {
            class NotWhere extends BaseSelect {
                protected executeWhereUndefinedLogic: () => void;
            }
        }
    }
}
declare module JsStore {
    module Business {
        module Select {
            class In extends NotWhere {
                private executeSkipAndLimitForIn;
                private executeSkipForIn;
                private executeLimitForIn;
                private executeSimpleForIn;
                protected executeInLogic: (column: any, values: any) => void;
            }
        }
    }
}
declare module JsStore {
    module Business {
        module Select {
            class Like extends In {
                CompSymbol: Occurence;
                CompValue: any;
                Column: any;
                CompValueLength: Number;
                private filterOnOccurence;
                private executeSkipAndLimit;
                private executeSkip;
                private executeLimit;
                private executeSimple;
                protected executeLikeLogic: (column: any, value: any, symbol: Occurence) => void;
            }
        }
    }
}
declare module JsStore {
    module Business {
        module Select {
            class Where extends Like {
                private executeWhereLogic;
            }
        }
    }
}
declare module JsStore {
    module Business {
        module Select {
            class Join extends BaseSelect {
                Query: ISelectJoin;
                QueryStack: Array<ITableJoin>;
                CurrentQueryStackIndex: number;
                private onTransactionCompleted;
                private executeWhereJoinLogic;
                private executeRightJoin;
                private executeWhereUndefinedLogicForJoin;
                private startExecutionJoinLogic();
                constructor(query: ISelectJoin, onSuccess: Function, onError: Function);
            }
        }
    }
}
declare module JsStore {
    module Business {
        module Select {
            class GroupByHelper extends Where {
                constructor();
                private executeAggregateGroupBy;
                protected processGroupBy: () => void;
            }
        }
    }
}
declare module JsStore {
    module Business {
        module Select {
            class Helper extends GroupByHelper {
                processOrderBy: () => void;
                private processAggregateQry;
                constructor();
            }
        }
    }
}
declare module JsStore {
    module Business {
        module Select {
            class Instance extends Helper {
                onTransactionCompleted: () => void;
                private createtransactionForOrLogic;
                private orQuerySuccess;
                private executeOrLogic;
                constructor(query: ISelect, onSuccess: Function, onError: Function);
            }
        }
    }
}
declare module JsStore {
    module Business {
        module Count {
            class BaseCount extends Base {
                ResultCount: number;
                SkipRecord: any;
                LimitRecord: any;
                CheckFlag: boolean;
            }
        }
    }
}
declare module JsStore {
    module Business {
        module Count {
            class NotWhere extends BaseCount {
                protected executeWhereUndefinedLogic: () => void;
            }
        }
    }
}
declare module JsStore {
    module Business {
        module Count {
            class In extends NotWhere {
                private executeInLogic;
            }
        }
    }
}
declare module JsStore {
    module Business {
        module Count {
            class Like extends In {
                CompSymbol: Occurence;
                CompValue: any;
                Column: any;
                CompValueLength: Number;
                private filterOnOccurence;
                protected executeLikeLogic: (column: any, value: any, symbol: Occurence) => void;
            }
        }
    }
}
declare module JsStore {
    module Business {
        module Count {
            class Where extends Like {
                private executeWhereLogic;
            }
        }
    }
}
declare module JsStore {
    module Business {
        module Count {
            class Instance extends Where {
                onTransactionCompleted: () => void;
                constructor(query: ICount, onSuccess: Function, onError: Function);
            }
        }
    }
}
declare module JsStore {
    module Business {
        module Update {
            var updateValue: (suppliedValue: any, storedValue: any) => any;
        }
        class BaseUpdate extends Base {
            CheckFlag: boolean;
        }
    }
}
declare module JsStore {
    module Business {
        module Update {
            class NotWhere extends BaseUpdate {
                protected executeWhereUndefinedLogic: () => void;
            }
        }
    }
}
declare module JsStore {
    module Business {
        module Update {
            class In extends NotWhere {
                private executeInLogic;
            }
        }
    }
}
declare module JsStore {
    module Business {
        module Update {
            class Like extends In {
                CompSymbol: Occurence;
                CompValue: any;
                Column: any;
                CompValueLength: Number;
                private filterOnOccurence;
                protected executeLikeLogic: (column: any, value: any, symbol: Occurence) => void;
            }
        }
    }
}
declare module JsStore {
    module Business {
        module Update {
            class Where extends Like {
                private executeWhereLogic;
            }
        }
    }
}
declare module JsStore {
    module Business {
        module Update {
            class Instance extends Where {
                protected onTransactionCompleted: () => void;
                private createtransactionForOrLogic;
                private executeOrLogic;
                constructor(query: IUpdate, onSuccess: Function, onError: Function);
                private checkSchema(suppliedValue, tableName);
            }
        }
    }
}
declare module JsStore {
    module Business {
        module Delete {
            class BaseDelete extends Base {
                CheckFlag: boolean;
            }
        }
    }
}
declare module JsStore {
    module Business {
        module Delete {
            class NotWhere extends BaseDelete {
                protected executeWhereUndefinedLogic: () => void;
            }
        }
    }
}
declare module JsStore {
    module Business {
        module Delete {
            class In extends NotWhere {
                private executeInLogic;
            }
        }
    }
}
declare module JsStore {
    module Business {
        module Delete {
            class Like extends In {
                CompSymbol: Occurence;
                CompValue: any;
                Column: any;
                CompValueLength: Number;
                private filterOnOccurence;
                protected executeLikeLogic: (column: any, value: any, symbol: Occurence) => void;
            }
        }
    }
}
declare module JsStore {
    module Business {
        module Delete {
            class Where extends Like {
                private executeWhereLogic;
            }
        }
    }
}
declare module JsStore {
    module Business {
        module Delete {
            class Instance extends Where {
                private onTransactionCompleted;
                private createtransactionForOrLogic;
                private executeOrLogic;
                constructor(query: IDelete, onSuccess: Function, onError: Function);
            }
        }
    }
}
declare module JsStore {
    var WorkerStatus: WebWorkerStatus, WorkerInstance: Worker;
    class CodeExecutionHelper {
        RequestQueue: Array<IWebWorkerRequest>;
        IsCodeExecuting: boolean;
        protected pushApi: (request: IWebWorkerRequest, usePromise: boolean) => any;
        private prcoessExecutionOfCode;
        private executeCode;
        private executeCodeDirect;
        private executeCodeUsingWorker;
        private processFinishedRequest;
        private onWorkerFailed;
        protected createWorker: () => void;
        private getScriptUrl(fileName);
        private onMessageFromWorker;
    }
}
import Model = JsStore.Model;
import DataBase = Model.DataBase;
import Column = Model.Column;
import Table = Model.Table;
declare var Promise: any;
declare module JsStore {
    class Instance extends CodeExecutionHelper {
        constructor(dbName?: any);
        /**
         * open database
         *
         * @param {string} dbName
         * @param {Function} [onSuccess=null]
         * @param {Function} [onError=null]
         * @returns
         * @memberof Instance
         */
        openDb: (dbName: string, onSuccess?: Function, onError?: Function) => any;
        /**
         * creates DataBase
         *
         * @param {Model.IDataBase} dataBase
         * @param {Function} [onSuccess=null]
         * @param {Function} [onError=null]
         * @returns
         * @memberof Instance
         */
        createDb: (dataBase: Model.IDataBase, onSuccess?: Function, onError?: Function) => any;
        /**
         * drop dataBase
         *
         * @param {Function} onSuccess
         * @param {Function} [onError=null]
         * @memberof Instance
         */
        dropDb: (onSuccess: Function, onError?: Function) => any;
        /**
         * select data from table
         *
         * @param {IQuery} query
         * @param {Function} [onSuccess=null]
         * @param {Function} [onError=null]
         *
         * @memberOf Main
         */
        select: (query: ISelect, onSuccess?: Function, onError?: Function) => any;
        /**
         * get no of result from table
         *
         * @param {ICount} query
         * @param {Function} [onSuccess=null]
         * @param {Function} [onError=null]
         * @memberof Instance
         */
        count: (query: ICount, onSuccess?: Function, onError?: Function) => any;
        /**
         * insert data into table
         *
         * @param {IInsert} query
         * @param {Function} [onSuccess=null]
         * @param {Function} [onError=null]
         * @memberof Instance
         */
        insert: (query: IInsert, onSuccess?: Function, onError?: Function) => any;
        /**
         * update data into table
         *
         * @param {IUpdate} query
         * @param {Function} [onSuccess=null]
         * @param {Function} [onError=null]
         * @memberof Instance
         */
        update: (query: IUpdate, onSuccess?: Function, onError?: Function) => any;
        /**
         * delete data from table
         *
         * @param {IDelete} query
         * @param {Function} [onSuccess=null]
         * @param {Function} onError
         * @memberof Instance
         */
        delete: (query: IDelete, onSuccess?: Function, onError?: Function) => any;
        /**
         * delete all data from table
         *
         * @param {string} tableName
         * @param {Function} [onSuccess=null]
         * @param {Function} [onError=null]
         * @memberof Instance
         */
        clear: (tableName: string, onSuccess?: Function, onError?: Function) => any;
        /**
         * insert bulk amount of data
         *
         * @param {IInsert} query
         * @param {Function} [onSuccess=null]
         * @param {Function} [onError=null]
         * @returns
         * @memberof Instance
         */
        bulkInsert: (query: IInsert, onSuccess?: Function, onError?: Function) => any;
        /**
         * export the result in json file
         *
         * @param {ISelect} qry
         * @memberof Instance
         */
        exportJson: (query: ISelect) => any;
    }
}
