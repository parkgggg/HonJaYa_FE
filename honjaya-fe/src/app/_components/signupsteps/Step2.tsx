"use client"

export default function Step2({ nextStep, prevStep }) {
    const handleSubmit = (event) => {
        event.preventDefault();
        nextStep();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <label htmlFor="birthday" className="block text-sm font-medium text-gray-700">생일은 언제인가요?</label>
            <input type="date" id="birthday" name="birthday" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
            <div className="flex justify-between">
                <button type="button" onClick={prevStep} className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50">뒤로</button>
                <button type="submit" className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">다음</button>
            </div>
        </form>
    );
}
