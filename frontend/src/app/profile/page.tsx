"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CalendarIcon, UserIcon } from 'lucide-react'

export default function AccountInfo() {
  const [personalInfo, setPersonalInfo] = useState({
    cardNumber: "9055295987",
    fullName: "Phan Nguyễn An Hưng",
    email: "phanhung@example.com",
    address: "123 Đường ABC, Quận 1, TP.HCM",
    phoneNumber: "0123456789",
    gender: "Nam",
    birthDate: "2004-01-19",
  })

  const [isEditing, setIsEditing] = useState(false)

  const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsEditing(false)
    alert("Thông tin đã được cập nhật!")
  }

  return (
    <div className="container mx-auto p-12">
        <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
            <CardTitle className="text-2xl font-bold">Thông tin cá nhân</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="flex flex-col lg:flex-row lg:space-x-8 space-y-6 lg:space-y-0">
            <div className="w-full lg:w-1/3 flex flex-col items-center space-y-4">
                <Avatar className="w-32 h-32">
                <AvatarImage src="/placeholder.svg?height=128&width=128" alt={personalInfo.fullName} />
                <AvatarFallback>
                    <UserIcon className="w-16 h-16" />
                </AvatarFallback>
                </Avatar>
                <div className="text-center">
                <h3 className="text-lg font-semibold">{personalInfo.fullName}</h3>
                <p className="text-sm text-gray-500">Số thẻ: {personalInfo.cardNumber}</p>
                </div>
            </div>

            <div className="w-full lg:w-2/3">
                {isEditing ? (
                <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleUpdate}>
                    <div className="space-y-2">
                    <Label htmlFor="fullName">Họ và tên</Label>
                    <Input
                        id="fullName"
                        value={personalInfo.fullName}
                        onChange={(e) =>
                        setPersonalInfo({ ...personalInfo, fullName: e.target.value })
                        }
                    />
                    </div>
                    <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        value={personalInfo.email}
                        onChange={(e) =>
                        setPersonalInfo({ ...personalInfo, email: e.target.value })
                        }
                    />
                    </div>
                    <div className="space-y-2">
                    <Label htmlFor="address">Địa chỉ</Label>
                    <Input
                        id="address"
                        value={personalInfo.address}
                        onChange={(e) =>
                        setPersonalInfo({ ...personalInfo, address: e.target.value })
                        }
                    />
                    </div>
                    <div className="space-y-2">
                    <Label htmlFor="phoneNumber">Số điện thoại</Label>
                    <Input
                        id="phoneNumber"
                        value={personalInfo.phoneNumber}
                        onChange={(e) =>
                        setPersonalInfo({ ...personalInfo, phoneNumber: e.target.value })
                        }
                    />
                    </div>
                    <div className="space-y-2">
                    <Label htmlFor="gender">Giới tính</Label>
                    <Select
                        value={personalInfo.gender}
                        onValueChange={(value) =>
                        setPersonalInfo({ ...personalInfo, gender: value })
                        }
                    >
                        <SelectTrigger id="gender">
                        <SelectValue placeholder="Chọn giới tính" />
                        </SelectTrigger>
                        <SelectContent>
                        <SelectItem value="Nam">Nam</SelectItem>
                        <SelectItem value="Nữ">Nữ</SelectItem>
                        <SelectItem value="Khác">Khác</SelectItem>
                        </SelectContent>
                    </Select>
                    </div>
                    <div className="space-y-2">
                    <Label htmlFor="birthDate">Ngày sinh</Label>
                    <div className="relative">
                        <Input
                        id="birthDate"
                        type="date"
                        value={personalInfo.birthDate}
                        onChange={(e) =>
                            setPersonalInfo({ ...personalInfo, birthDate: e.target.value })
                        }
                        />
                        <CalendarIcon className="absolute right-3 top-2.5 h-5 w-5 text-gray-500" />
                    </div>
                    </div>
                    <div className="md:col-span-2 pt-4">
                    <Button type="submit" className="w-full bg-red-500 hover:bg-red-700">Lưu thông tin</Button>
                    </div>
                </form>
                ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6">
                    <div className="space-y-1">
                    <Label className="text-sm text-gray-500">Họ và tên</Label>
                    <p className="font-medium">{personalInfo.fullName}</p>
                    </div>
                    <div className="space-y-1">
                    <Label className="text-sm text-gray-500">Email</Label>
                    <p className="font-medium break-words">{personalInfo.email}</p>
                    </div>
                    <div className="space-y-1">
                    <Label className="text-sm text-gray-500">Địa chỉ</Label>
                    <p className="font-medium">{personalInfo.address}</p>
                    </div>
                    <div className="space-y-1">
                    <Label className="text-sm text-gray-500">Số điện thoại</Label>
                    <p className="font-medium">{personalInfo.phoneNumber}</p>
                    </div>
                    <div className="space-y-1">
                    <Label className="text-sm text-gray-500">Giới tính</Label>
                    <p className="font-medium">{personalInfo.gender}</p>
                    </div>
                    <div className="space-y-1">
                    <Label className="text-sm text-gray-500">Ngày sinh</Label>
                    <p className="font-medium">{personalInfo.birthDate}</p>
                    </div>
                    <div className="md:col-span-2 pt-4">
                    <Button onClick={() => setIsEditing(true)} className="w-full bg-red-500 hover:bg-red-700">
                        Cập nhật thông tin
                    </Button>
                    </div>
                </div>
                )}
            </div>
            </div>
        </CardContent>
        </Card>
    </div>
    
  )
}

