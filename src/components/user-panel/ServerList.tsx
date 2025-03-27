
import React from 'react';

const ServerList = () => {
  return (
    <div className="lg:col-span-2 bg-white rounded-xl shadow-sm">
      <div className="p-6 border-b">
        <h3 className="font-semibold">سرورهای اخیر</h3>
      </div>
      <div className="p-6">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">نام سرور</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">IP</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">پلن</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">وضعیت</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">تاریخ انقضا</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-4 py-3 text-sm font-medium">سرور آلمان 1</td>
                <td className="px-4 py-3 text-sm text-gray-500">37.27.10.156</td>
                <td className="px-4 py-3 text-sm text-gray-500">VPS-4G</td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    فعال
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-500">1402/12/25</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-medium">سرور هلند 1</td>
                <td className="px-4 py-3 text-sm text-gray-500">217.65.43.12</td>
                <td className="px-4 py-3 text-sm text-gray-500">VPS-8G</td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    فعال
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-500">1403/02/15</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-medium">سرور آمریکا 1</td>
                <td className="px-4 py-3 text-sm text-gray-500">144.126.59.87</td>
                <td className="px-4 py-3 text-sm text-gray-500">VPS-2G</td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    فعال
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-500">1403/01/05</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ServerList;
