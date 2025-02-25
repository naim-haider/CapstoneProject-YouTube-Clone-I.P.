import React, { useState } from "react";

const Sidebar = ({ isOpen, onToggleSidebar }) => {
  // console.log(isOpen);

  return (
    <div
      className={`fixed top-0 left-0 w-[20%] md:overflow-auto  md:px-3 h-full bg-gray-200 text-black transition-transform duration-500 ease-in-out ${
        isOpen
          ? "transform translate-x-0 block z-[100] "
          : "transform -translate-x-full hidden"
      }   `}
    >
      <div>
        <div className="flex mt-[10.5px] ml-2 gap-3 items-center">
          <div
            onClick={onToggleSidebar}
            className="h-12 w-12 mt-4 mr-2 hidden md:flex md:flex-col md:items-center ml-4 md:justify-center rounded-full hover:bg-slate-200 cursor-pointer"
          >
            <div className="w-8 h-0.5 bg-black mb-1.5" />
            <div className="w-8 h-0.5 bg-black mb-1.5" />
            <div className="w-8 h-0.5 bg-black" />
          </div>
          <div className=" h-10 mt-4 -ml-2 flex justify-center items-center cursor-pointer">
            <img src="/logo.png" alt="youtube-icon" className="h-14 w-48" />
          </div>
        </div>
        <div className="w-full">
          <div className="h-10 w-[90%] mt-5 flex items-center bg-slate-100 rounded-md cursor-pointer px-2">
            <div className="w-7 h-7  flex justify-center items-center ml-4 mr-2">
              <i className="fa-solid fa-house fa-lg" />
            </div>
            <div className="w-20 h-7 flex ml-5 items-center text-md font-sans">
              Home
            </div>
          </div>
          <div className="h-10 w-[90%] mt-1 flex items-center rounded-md cursor-pointer hover:bg-slate-100 px-2">
            <div className="w-7 h-7  flex justify-center items-center ml-4 mr-2">
              <i className="fa-solid fa-file-video fa-lg" />
            </div>
            <div className="w-20 h-7  flex ml-5 items-center text-lg font-sans">
              Shorts
            </div>
          </div>
          <div className="h-10 w-[90%] mt-1 flex items-center rounded-md cursor-pointer hover:bg-slate-100 px-2">
            <div className="w-7 h-7  flex justify-center items-center ml-4 mr-2">
              <i className="fa-regular fa-folder fa-lg" />
            </div>
            <div className="w-32 h-7  flex ml-5 items-center text-md font-sans">
              Subscription
            </div>
          </div>
        </div>
        <div className="w-full">
          <div className="h-10 w-[90%] mt-1 flex items-center rounded-md cursor-pointer hover:bg-slate-100 px-2">
            <div className="w-7 h-7  flex justify-center items-center ml-4 mr-2 font-md text-md font-sans">
              You
            </div>
            <div className="w-7 h-5  flex items-center font-medium font-sans ml-2 mt-1">
              <i className="fa-solid fa-greater-than fa-xs" />
            </div>
          </div>
          <div className="h-10 w-[90%] mt-1 flex items-center rounded-md cursor-pointer hover:bg-slate-100 px-2">
            <div className="w-7 h-7  flex justify-center items-center ml-4 mr-2">
              <i className="fa-solid fa-file-video fa-lg" />
            </div>
            <div className="w-32 h-7  flex ml-5 items-center text-md font-sans">
              Your channel
            </div>
          </div>
          <div className="h-10 w-[90%] mt-1 flex items-center rounded-md cursor-pointer hover:bg-slate-100 px-2">
            <div className="w-7 h-7  flex justify-center items-center ml-4 mr-2">
              <i className="fa-solid fa-clock-rotate-left fa-lg" />
            </div>
            <div className="w-32 h-7  flex ml-5 items-center text-md font-sans">
              History
            </div>
          </div>
          <div className="h-10 w-[90%] mt-1 flex items-center rounded-md cursor-pointer hover:bg-slate-100 px-2">
            <div className="w-7 h-7  flex justify-center items-center ml-4 mr-2">
              <i className="fa-solid fa-video fa-lg" />
            </div>
            <div className="w-32 h-7  flex ml-5 items-center text-md font-sans">
              Your videos
            </div>
          </div>
          <div className="h-10 w-[90%] mt-1 flex items-center rounded-md cursor-pointer hover:bg-slate-100 px-2">
            <div className="w-7 h-7  flex justify-center items-center ml-4 mr-2">
              <i className="fa-regular fa-clock fa-lg" />
            </div>
            <div className="w-32 h-7  flex ml-5 items-center text-md font-sans">
              Watch Later
            </div>
          </div>
          <div className="h-10 w-[90%] mt-1 flex items-center rounded-md cursor-pointer hover:bg-slate-100 px-2">
            <div className="w-7 h-7  flex justify-center items-center ml-4 mr-2">
              <i className="fa-solid fa-caret-down fa-lg" />
            </div>
            <div className="w-32 h-7  flex ml-5 items-center text-md font-sans">
              Show more
            </div>
          </div>
        </div>
        <div className="w-full">
          <div className="h-10 w-[90%] flex items-center rounded-md font-bold text-md px-2">
            <div className="w-32 h-7  flex items-center ml-4">
              Subscriptions
            </div>
          </div>
          <div className="h-10 w-[92%] flex items-center gap-x-3 hover:bg-slate-100 cursor-pointer rounded-md px-2">
            <div className="h-5 w-7 ml-4">
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQMAAADCCAMAAAB6zFdcAAAAhFBMVEX///8AAAD8/PwEBAT5+fnw8PD19fXT09PZ2dmcnJzo6OiRkZHIyMiAgIAvLy/s7Ozf399FRUVqamqsrKykpKTj4+O9vb2xsbHFxcVOTk6lpaVeXl6Hh4d6eno0NDS4uLgYGBhvb29XV1eWlpYiIiI+Pj4bGxtSUlInJydBQUFkZGQRERFSudsNAAAMvUlEQVR4nO1dCZuiPAwuLQgICN63DqOOM/r//99HknIURdnZwzJf3312VpjqkjRJc7UyZmBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGDQYXDGOb2ynWniuWEYut6079j577MBL3u4fwNiwDT0o+HuzSrxsVtGfth/9eP9I/Tn6cBqwmC7j1/9gH8biX8qCRYq/fnl1yR59WP+PcSr4X3qb7CcOwzNwg8yDUCKt72h/3N5GQHWw2OdCyLy2I9iQQb3XKXw8z1auE6VQu64s+35ozro7L7saf8G3EtFAtYTt9cwznH9M43EsaMp+xmywJmTlpO7njmV39wb3p8Py+FR70fwgI2zeRU4r7tJj5wkoov34n7ieZmHFPcUSvvBoJCb8Uue+U+Bo0eULC3Jg/OM5z4Si73J5ny6FvN9Pb0HKw9FBDlk74c5Ey59+qiX0vJtADUT5ABYuJBuZT/cYFlSX8Xb+8HDUfB3tsN3Cus6y+91Er2RpG6wkHd4WC6Ripcg8svIRXKzH/tPKQtpkw3VHpke7CRpvk0i7kxOVgMqDDmh2ciG9zbIG2F9TTsoB0jxzCJFOPfpRj+6rwK3+AhsqTY7qSVhB5mQYSWnd0KXzqYlA0gmAvKWeSDVZF/E3J0BZwFZtJ0LqyHjfmsOkPBYH7gq2mxxJa50bpHkLKInf3dQtd3hM7Lv4OyhAvSXtLaOWcdE4UBkbBhKdPANDgAC0oeU1KNTkgBuAdr5A+M2Y8nwebR8DyBGMVrTgNRj/mrC2oOzOT3zAaV39k0hQA04Ugh9IHVwu7M6LGgSiQUTK0j60+k0AWT/9vtxHDsZ+t7icH7KCFgQsj/SpHYm4ZiQG+CDGNspvBx5TWPjyVsT8bk+rJCVB1SnndP0QTohm7QhLfB4MZLhQpRLsT113XDhuo4czeL3JzwAq1IsNJfXUdYe+cOmMHn2qCAmJSaUbsLQl3PKL88sZoCSsC5Yqz3IBA7RMUpJCBCUGVOcxT351L3Ph0wQsMQCQweVz9EafcwJfkyBBxur4IGQLrPqMK/I65k/lAKB/nY20MPLneZBZEbQCOc0hNdjq+oX+DgiUubXIlvJH8dSMHAGTJjjxUbrBTJ7zD0+JirtQpXwGx4A3umNI+spErKw5CVoDC5ndACKEH/c48G2RhpV1p4GVMI6gQo4mHk5vZDEpyB/DicKzbioMoF4kNaIwwwbas0zbOE/WFgUR+sLHuOUwdPeTi3x4FK7CyEAb8WDzCSQv2FZx57GFgGt/hXinP4NCfd5QLHgpA0P3sCfSFAQ/BfS+AREOLh17Nbvoede304uu7US97EFQdjCB3/o6jLL1NEVDOLiNlomHtQdYwoLP1twQIaNDl6sXktqEzjv4eOBO2Pf6bIgHpxVsgao2G4rMbCsMzE6w/GlpD4AavUb2KuxJW68X+LBUuUBOY8t3AMcna0iHOxu9uELZj96lJcBawfoHl3LkskjHlhf6CqHLcXAyjwDjm6WAJHQESTRUC6/6/8fcNCw4E02mTv0kPptrIEEuBMUNujZr4Nu8Ch7we8mkYkH1TrTyIFpdQa/kGxcw2fgx2u5PPaO+UTdl23iQTSQBB+36E0yD+PM1lyA6Ucx+9LRTSLK4VV6l6R84pzEdUN3Ki9+NeseZHzrFdzQDagK2+IRG3igzJ63uenFegxYTLl0MnRUhh7n1GCyf8SD03C72oeuu9j7lw/rG3UHWB5t+J+0TKVw2WbSsNoTD5pbVFsBAjLqaNbRHOTgdsPjkzv0mzzIfLCXUtcSTR7PH+KBNX0xfW1w+Ms86ELRsalkQqHe7/MgfTF9LdBrWu7+FA+GLyawBaZNz04Zo9/ngdC/7tpYaf9TPLAa67faoDE9SjzY/T4PdM4qExq7z8ieN/YntoemebQK0sc8+Pp9HuhfeW7MixEPlt/qTFKg/+LY2FFBFaWnvQbPsX4xhU9xP4cEIHO+/T/woMnoyWac9vnTH8WD6zCde2WwOw1ns9khCAJ/vF+E6E68e4vZfOUHcHM1n4UhyYrIImV3MRtP5GDZwK09D9itLiweDU9gRL3RKg+/hboG2KeO8ODWJo42myiCv4itX7ZQOOP1ETdznKKwuDk9rD+pRAO/OU/yvb/hdtARXWhTMzphCoCrZYhBQtmhW1/70oM6du5gig6sjelzHlDox5Wak7AGVDy742dCBrlSp9y8krxWeL5TI5PzEDOPG/XmhDYx1QZb1s7Oa0sE/X3lVi0la+w8rZWb33DpqGXmhcB531TcCv1jpnZd6lNIw9u1VmVaQOpdGtDdZFdLkjoWV1Q05lAUYK9Kvf3kwqhhs+pJCuto1zwr/XMojbk0BSesx9Q6GIm6epkKOrzSynUHcmnNQZMCdBJUfgmZZhmpnFkw7lSv9V8am3PrKrnYv6fMb9GYX1sZGFfvdGFXU8uoCMOHhcoDWvVipXt5VHMkNDeJckd/Gw4I6rhUdf8q3WLF1cwWC0UV3l5G3q+gTZpEyEVAadkcyWNgqqJ/dRSXQ2QxuMbo2VgUR31ukyeJGa95E+AfQFG5Kh3Q21NRBYHGFKv8OvalVXsw2ggC2jZFGbLLCDUqLe/tZXidAxsate3BUHpxWggCbV0YSYYJlPKZhbNb+g1gIpTub3CciXE6llp66M8292TdoF8LlT3wk9Ff5kV3IwQWSjoeKEdP8qRlE8YWJhOWeN6uiICNak4RM5zQzyYXIcp5MFdDRsqfYBzta9mJgmGgiNtuR7B2+C7pFQrQb2j2jUE6CklyasE4HAWhc48m1RJhdp/s0SII0uhCGRLKy6Of1JNxInTkVoPLE6wbEf1GRzGQ6zhuLWgjCDJhasuLdyn1X0ic3Po1rvW0L5gtd4cs9OQBdGPJoz/sFqVVYQ3wbSldzknqBfUbScpjdSPckMlzAKyrto1pES6K8OrOHo47cOVQQI8xegemFvhRNqeX2RNBi45tSeOhKSp7eW6yQfcEYYsuHxqPESypyIQBTjFawnE1qpKxJsqFtnt5WG7DIRXSKp10xF5TzCaFZZsz9nJ78oMqqaY3aHOfVo/a0RKxyKeXrdo4i2jZQPc/Mhc7XwAodz5A228f86VTbvelvX06xgoS+R5P3O18acGEEQy0d0h3ES0OUDoOaCYLRwGbdPNBY10NIsOgj1QaHtF5vKOfgOQG6AKXYTTW3RJ0kEpV2DnFpradxiwAzDD8CfBMpKcckHtXE8iTxtUZB3yBg1SOTOSm+i6cDJOWUzl+vkBS/fR0qLhV2VtQ3YNxrgrSGOSaoH+tLca9OZ8xK481egRc5FZepWYvBG1+ncYVVZiwouB20nLjggpKI4Egc17f3VyHoE4tzitrqSBTCY5SLz9nF3WrR6VntwsHhqVIB/XePK3EgzLAQF9RG4cpaecIU2zvuGlS/848gE17GH2sq6bWI6MgisqZ2r8q+/OlKmxllRr06l13e8jorMjpBz5uFgXb8oyoB6CSiafepDybLEPRyUA+WopjZ06kDy3JBFBdv3JW6h0sWbGRuwLMsy3kkTiACX1kFzaxIPIDbPC0MMbm19qpIDfkoquoAAmHXsbjAkWLpMDqzomidGCioPMq4Ijlh9kEIPfGnVrCp4BS9OVhaZbo2FGa2cxt6ak3YBOY3dygI7CWfvv7KWrUodgtSCzgXVgXc9AZWRkta1rm3AfHSE7z7EkVGfXrU4Kf1B92TwoAqA4CzMCnS7PXfARSkMxv+TPwvAlFyLNjN1mAIjyWnvKKLuP7B78U6YEaIjpFFNsZckV4NVHfwF4+/lmuaP2tqNCd80BlAr14C6Qf4Mmj599cbZOoD8GZN6Azli1fPn/f3+V037UOxJDTRPrKNh0wLaxlF88aB0CYc5HElmfOu8/OQsIz53Fb9yw/cz6yO8oCQn7guLXExgGkJdwMG757YBmUDd0hLQfCept1mgMMNVoI+g6KRUlK7PnR8lTqw/V0jnz5HRTwo7df5qpx0b8f8TG4PGSbqN3hEarF4QXcmSaJ67peMu3lRh//deR3kcC7xrn0dBV4qCrrp0QRzuqsuTxCtDr7tVWEWZGj+3kPreFWGzfXE0+mw3j5D710PL9aoBppWmD/JkKlx/C43sxcVSDicLZ5V/pW1x31Ce6DvlIjVZwAwOdylAJGy4L4ohEpSrpuCGqQX0hEX9r3IJeQ+07LlcN+khBUwb2g3JdUnfbq66Gf/EzqS0zHo+b2/kE6xkjhJzOB599lGmyHu6qz+LFbbg/0XaY/ygo8Brfx5LRwgV9q62hcTjf4F/jfCP4zGEYYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgY/AD8B/xWkJeY+O46AAAAAElFTkSuQmCC"
                alt=""
                className="h-5 w-7 "
              />
            </div>
            <div className="h-5 text-sm w-24">
              <p>College</p>
            </div>
            <div className=" h-5 w-7 flex justify-center items-center text-red-700">
              <i className="fa-solid fa-tower-broadcast" />
            </div>
          </div>
          <div className="h-10 w-[92%] flex items-center gap-x-3 hover:bg-slate-100 cursor-pointer rounded-md px-2">
            <div className="h-5 w-7 bg-slate-100 ml-4 flex justify-center">
              <img
                src="data:image/jpeg;base64,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"
                alt=""
                className="h-5 w-5"
              />
            </div>
            <div className=" h-5 text-sm w-24">
              <p>Filter Copy</p>
            </div>
            <div className=" h-5 w-7 flex justify-center items-center text-red-700">
              <i className="fa-solid fa-tower-broadcast" />
            </div>
          </div>
          <div className="h-10 w-[92%] flex items-center gap-x-3 hover:bg-slate-100 cursor-pointer rounded-md px-2">
            <div className="h-5 w-7 bg-slate-100 ml-4 flex justify-center">
              <img
                src="data:image/jpeg;base64,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"
                alt=""
                className="h-5 w-5 rounded-full"
              />
            </div>
            <div className=" h-5 text-sm w-24">
              <p>Chai Code</p>
            </div>
            <div className=" h-5 w-7 flex justify-center items-center text-red-700">
              <i className="fa-solid fa-tower-broadcast" />
            </div>
          </div>
          <div className="h-10 w-[92%] flex items-center rounded-md cursor-pointer hover:bg-slate-100 px-2">
            <div className="w-7 h-7  flex justify-center items-center ml-4 mr-4">
              <i className="fa-solid fa-caret-down fa-lg" />
            </div>
            <div className=" h-5 text-sm w-24">
              <p>Show more</p>
            </div>
          </div>
        </div>
        <div className="w-full h-96">
          <div className="h-10 w-[90%] flex items-center rounded-md font-bold text-md px-2">
            <div className="w-32 h-7  flex items-center ml-4">Explore</div>
          </div>
          <div className="h-10 w-[90%] mt-1 flex items-center rounded-md cursor-pointer hover:bg-slate-100 px-2">
            <div className="w-7 h-7  flex justify-center items-center ml-4 mr-2">
              <i className="fa-solid fa-hourglass-half" />
            </div>
            <div className="w-32 h-7  flex ml-5 items-center text-md font-sans">
              Trending
            </div>
          </div>
          <div className="h-10 w-[90%] mt-1 flex items-center rounded-md cursor-pointer hover:bg-slate-100 px-2">
            <div className="w-7 h-7  flex justify-center items-center ml-4 mr-2">
              <i className="fa-solid fa-bag-shopping" />
            </div>
            <div className="w-32 h-7  flex ml-5 items-center text-md font-sans">
              Shopping
            </div>
          </div>
          <div className="h-10 w-[90%] mt-1 flex items-center rounded-md cursor-pointer hover:bg-slate-100 px-2">
            <div className="w-7 h-7  flex justify-center items-center ml-4 mr-2">
              <i className="fa-solid fa-music" />
            </div>
            <div className="w-32 h-7  flex ml-5 items-center text-md font-sans">
              Music
            </div>
          </div>
          <div className="h-10 w-[90%] mt-1 flex items-center rounded-md cursor-pointer hover:bg-slate-100 px-2">
            <div className="w-7 h-7  flex justify-center items-center ml-4 mr-2">
              <i className="fa-solid fa-film" />
            </div>
            <div className="w-32 h-7  flex ml-5 items-center text-md font-sans">
              Film
            </div>
          </div>
          <div className="h-10 w-[90%] mt-1 flex items-center rounded-md cursor-pointer hover:bg-slate-100 px-2">
            <div className="w-7 h-7  flex justify-center items-center ml-4 mr-2">
              <i className="fa-solid fa-tower-broadcast" />
            </div>
            <div className="w-32 h-7  flex ml-5 items-center text-md font-sans">
              Live
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
