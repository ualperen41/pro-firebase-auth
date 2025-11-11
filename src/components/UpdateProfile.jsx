import { useState } from "react";
import { update, auth, resetPassword } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../pages/store/auth";

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [displayName, setDisplayName] = useState(user.displayName || "");
  const [avatar, setAvatar] = useState(user.photoURL || "");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    await update({
      displayName: displayName,
      photoURL: avatar,
    });
    dispatch(
      login({
        displayName: auth.currentUser.displayName,
        email: auth.currentUser.email,
        emailVerified: auth.currentUser.emailVerified,
        photoUrl: auth.currentUser.photoURL,
        uid: auth.currentUser.uid,
      })
    );
  };
  const handleResetSubmit = async (e) => {
    e.preventDefault();
    const result = await resetPassword(password);
    if (result) {
      setPassword("");
    }
  };
  return (
    <div className="grid gap-y-10">
      <form onSubmit={handleSubmit} className="grid gap-y-4">
        <h1 className="text-xl font-bold mb-4">Profili Güncelle</h1>
        <div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Ad-soyad
            </label>
            <div className="mt-1">
              <input
                type="text"
                id="email"
                className="block w-full rounded-md border border-gray-300 focus:border-2 focus:border-purple-500 focus:outline-none p-2"
                value={displayName}
                placeholder="John Doe"
                onChange={(e) => setDisplayName(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Fotoğraf
            </label>
            <div className="mt-1">
              <input
                type="text"
                id="email"
                className="block w-full rounded-md border border-gray-300 focus:border-2 focus:border-purple-500 focus:outline-none p-2"
                value={avatar}
                placeholder="John Doe"
                onChange={(e) => setAvatar(e.target.value)}
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className=" disabled:opacity-20 inline-flex items-center justify-center 
             px-4 py-2 border border-transparent text-sm font-medium rounded-md 
             shadow-md text-white bg-indigo-600 
             hover:bg-indigo-700 hover:border-indigo-600 
             focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 
             transition-all duration-200 hover:scale-95 active:scale-90 mt-3 cursor-pointer"
            >
              Güncelle
            </button>
          </div>
        </div>
      </form>
      <form onSubmit={handleResetSubmit} className="grid gap-y-4">
        <h1 className="text-xl font-bold mb-4">Parolayı Güncelle</h1>
        <div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Parola
            </label>
            <div className="mt-1">
              <input
                type="password"
                id="email"
                className="block w-full rounded-md border border-gray-300 focus:border-2 focus:border-purple-500 focus:outline-none p-2"
                value={password}
                placeholder="Değiştirmek istemiyorsanız boş bırakın!"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              disabled={!password}
              type="submit"
              className=" disabled:opacity-20 inline-flex items-center justify-center 
             px-4 py-2 border border-transparent text-sm font-medium rounded-md 
             shadow-md text-white bg-indigo-600 
             hover:bg-indigo-700 hover:border-indigo-600 
             focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 
             transition-all duration-200 hover:scale-95 active:scale-90 mt-3 cursor-pointer"
            >
              Şifreyi Güncelle
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateProfile;
